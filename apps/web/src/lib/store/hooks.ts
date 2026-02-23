"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  calculateSettlement,
  calculateReceiveSummary,
} from "@dutch/core";

import {
  subscribe,
  getTemplatesSnapshot,
  getServerTemplatesSnapshot,
  getTemplateSnapshot,
  getServerTemplateSnapshot,
  createTemplate,
  deleteTemplate,
  updateTemplateName,
  addParticipant,
  removeParticipant,
  addPayment,
  removePayment,
  getSettlementInput,
} from "./store";

// ─── useTemplates ───────────────────────────────────────

export function useTemplates() {
  const templates = useSyncExternalStore(
    subscribe,
    getTemplatesSnapshot,
    getServerTemplatesSnapshot,
  );

  const create = useCallback((name: string) => {
    return createTemplate(name);
  }, []);

  const remove = useCallback((id: string) => {
    deleteTemplate(id);
  }, []);

  const rename = useCallback((id: string, name: string) => {
    updateTemplateName(id, name);
  }, []);

  return { templates, create, remove, rename };
}

// ─── useTemplate ────────────────────────────────────────

export function useTemplate(id: string) {
  const getSnapshot = useMemo(() => getTemplateSnapshot(id), [id]);

  const template = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => getServerTemplateSnapshot(),
  );

  const rename = useCallback(
    (name: string) => {
      updateTemplateName(id, name);
    },
    [id],
  );

  const addMember = useCallback(
    (name: string) => {
      return addParticipant(id, name);
    },
    [id],
  );

  const removeMember = useCallback(
    (participantId: string) => {
      removeParticipant(id, participantId);
    },
    [id],
  );

  const addPaymentItem = useCallback(
    (data: {
      title: string;
      amount: number;
      payerId: string;
      participantIds: string[];
    }) => {
      return addPayment(id, data);
    },
    [id],
  );

  const removePaymentItem = useCallback(
    (paymentId: string) => {
      removePayment(id, paymentId);
    },
    [id],
  );

  return {
    template,
    rename,
    addMember,
    removeMember,
    addPaymentItem,
    removePaymentItem,
  };
}

// ─── useSettlement ──────────────────────────────────────

export function useSettlement(templateId: string) {
  const getSnapshot = useMemo(
    () => getTemplateSnapshot(templateId),
    [templateId],
  );

  const template = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => getServerTemplateSnapshot(),
  );

  return useMemo(() => {
    if (!template || template.participants.length === 0) {
      return { settlement: null, receiveSummary: null };
    }

    const { participantNames, payments } = getSettlementInput(template);

    if (participantNames.length === 0 || payments.length === 0) {
      return { settlement: null, receiveSummary: null };
    }

    const settlement = calculateSettlement(participantNames, payments);
    const receiveSummary = calculateReceiveSummary(
      participantNames,
      settlement,
    );

    return { settlement, receiveSummary };
  }, [template]);
}
