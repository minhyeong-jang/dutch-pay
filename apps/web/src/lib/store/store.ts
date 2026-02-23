"use client";

import { nanoid } from "nanoid";

import { TAG_COLORS, STORAGE_KEYS } from "./constants";
import type { LocalTemplate, LocalParticipant, LocalPayment } from "./types";

// ─── Subscriber registry (shared across all hooks) ──────

const subscribers = new Set<() => void>();

export function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function notifyAll() {
  for (const cb of subscribers) cb();
}

// ─── Storage helpers ────────────────────────────────────

function getTemplates(): LocalTemplate[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.templates);
    return raw ? (JSON.parse(raw) as LocalTemplate[]) : [];
  } catch {
    return [];
  }
}

function saveTemplates(templates: LocalTemplate[]): void {
  localStorage.setItem(STORAGE_KEYS.templates, JSON.stringify(templates));
}

// ─── Snapshot getters (for useSyncExternalStore) ────────

let cachedTemplates: LocalTemplate[] | null = null;
let cachedVersion = -1;
let currentVersion = 0;

export function getTemplatesSnapshot(): LocalTemplate[] {
  if (cachedVersion !== currentVersion) {
    cachedTemplates = getTemplates().sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    cachedVersion = currentVersion;
  }
  return cachedTemplates ?? [];
}

export function getServerTemplatesSnapshot(): LocalTemplate[] {
  return [];
}

export function getTemplateSnapshot(
  id: string,
): () => LocalTemplate | undefined {
  let cached: LocalTemplate | undefined | null = null;
  let version = -1;
  return () => {
    if (version !== currentVersion) {
      cached = getTemplates().find((t) => t.id === id);
      version = currentVersion;
    }
    return cached ?? undefined;
  };
}

export function getServerTemplateSnapshot(): LocalTemplate | undefined {
  return undefined;
}

// ─── Invalidation helper ───────────────────────────────

function invalidateAndNotify() {
  currentVersion++;
  cachedTemplates = null;
  notifyAll();
}

// ─── Template CRUD ──────────────────────────────────────

export function listTemplates(): LocalTemplate[] {
  return getTemplates().sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getTemplate(id: string): LocalTemplate | undefined {
  return getTemplates().find((t) => t.id === id);
}

export function createTemplate(name: string): LocalTemplate {
  const now = new Date().toISOString();
  const template: LocalTemplate = {
    id: nanoid(12),
    name,
    participants: [],
    payments: [],
    createdAt: now,
    updatedAt: now,
  };
  const templates = getTemplates();
  templates.push(template);
  saveTemplates(templates);
  invalidateAndNotify();
  return template;
}

export function updateTemplateName(
  id: string,
  name: string,
): LocalTemplate | undefined {
  const templates = getTemplates();
  const idx = templates.findIndex((t) => t.id === id);
  const target = templates[idx];
  if (idx === -1 || !target) return undefined;
  target.name = name;
  target.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  invalidateAndNotify();
  return target;
}

export function deleteTemplate(id: string): void {
  const templates = getTemplates().filter((t) => t.id !== id);
  saveTemplates(templates);
  invalidateAndNotify();
}

// ─── Participant CRUD ───────────────────────────────────

export function addParticipant(
  templateId: string,
  name: string,
): LocalParticipant | undefined {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return undefined;

  if (template.participants.some((p) => p.name === name)) return undefined;

  const colorIndex = template.participants.length % TAG_COLORS.length;
  const participant: LocalParticipant = {
    id: nanoid(8),
    name,
    tagColor: TAG_COLORS[colorIndex] ?? "#0D9488",
  };

  template.participants.push(participant);
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  invalidateAndNotify();
  return participant;
}

export function removeParticipant(
  templateId: string,
  participantId: string,
): void {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  template.participants = template.participants.filter(
    (p) => p.id !== participantId,
  );
  for (const payment of template.payments) {
    payment.participantIds = payment.participantIds.filter(
      (id) => id !== participantId,
    );
    if (payment.payerId === participantId) {
      payment.payerId = "";
    }
  }
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  invalidateAndNotify();
}

// ─── Payment CRUD ───────────────────────────────────────

export function addPayment(
  templateId: string,
  data: {
    title: string;
    amount: number;
    payerId: string;
    participantIds: string[];
  },
): LocalPayment | undefined {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return undefined;

  const payment: LocalPayment = {
    id: nanoid(8),
    ...data,
  };

  template.payments.push(payment);
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  invalidateAndNotify();
  return payment;
}

export function removePayment(templateId: string, paymentId: string): void {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  template.payments = template.payments.filter((p) => p.id !== paymentId);
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  invalidateAndNotify();
}

// ─── Settlement calculation adapter ─────────────────────

export function getSettlementInput(template: LocalTemplate) {
  const participantNames = template.participants.map((p) => p.name);
  const participantMap = new Map(
    template.participants.map((p) => [p.id, p.name]),
  );

  const payments = template.payments
    .filter((p) => p.payerId && p.participantIds.length > 0 && p.amount > 0)
    .map((p) => ({
      amount: p.amount,
      payerName: participantMap.get(p.payerId) ?? "",
      participantNames: p.participantIds
        .map((id) => participantMap.get(id))
        .filter((n): n is string => !!n),
    }));

  return { participantNames, payments };
}
