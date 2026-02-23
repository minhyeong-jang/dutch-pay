"use client";

import { nanoid } from "nanoid";

import { TAG_COLORS, STORAGE_KEYS } from "./constants";

// ─── Types ─────────────────────────────────────────────

export interface LocalParticipant {
  id: string;
  name: string;
  tagColor: string;
}

export interface LocalPayment {
  id: string;
  title: string;
  amount: number;
  payerId: string;
  participantIds: string[];
}

export interface LocalTemplate {
  id: string;
  name: string;
  participants: LocalParticipant[];
  payments: LocalPayment[];
  createdAt: string;
  updatedAt: string;
}

// ─── Storage helpers ───────────────────────────────────

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

// ─── Template CRUD ─────────────────────────────────────

export function listTemplates(): LocalTemplate[] {
  return getTemplates().sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
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
  return template;
}

export function updateTemplateName(id: string, name: string): LocalTemplate | undefined {
  const templates = getTemplates();
  const idx = templates.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  templates[idx]!.name = name;
  templates[idx]!.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  return templates[idx];
}

export function deleteTemplate(id: string): void {
  const templates = getTemplates().filter((t) => t.id !== id);
  saveTemplates(templates);
}

// ─── Participant CRUD ──────────────────────────────────

export function addParticipant(
  templateId: string,
  name: string,
): LocalParticipant | undefined {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return undefined;

  // 중복 방지
  if (template.participants.some((p) => p.name === name)) return undefined;

  const colorIndex = template.participants.length % TAG_COLORS.length;
  const participant: LocalParticipant = {
    id: nanoid(8),
    name,
    tagColor: TAG_COLORS[colorIndex]!,
  };

  template.participants.push(participant);
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
  return participant;
}

export function removeParticipant(templateId: string, participantId: string): void {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  template.participants = template.participants.filter((p) => p.id !== participantId);
  // 참가자가 빠진 결제에서도 제거
  for (const payment of template.payments) {
    payment.participantIds = payment.participantIds.filter((id) => id !== participantId);
    if (payment.payerId === participantId) {
      payment.payerId = "";
    }
  }
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
}

// ─── Payment CRUD ──────────────────────────────────────

export function addPayment(
  templateId: string,
  data: { title: string; amount: number; payerId: string; participantIds: string[] },
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
  return payment;
}

export function removePayment(templateId: string, paymentId: string): void {
  const templates = getTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return;

  template.payments = template.payments.filter((p) => p.id !== paymentId);
  template.updatedAt = new Date().toISOString();
  saveTemplates(templates);
}

// ─── Settlement calculation adapter ────────────────────

/**
 * localStorage 데이터를 @dutch/core 정산 함수에 전달할 형태로 변환
 */
export function getSettlementInput(template: LocalTemplate) {
  const participantNames = template.participants.map((p) => p.name);
  const participantMap = new Map(template.participants.map((p) => [p.id, p.name]));

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
