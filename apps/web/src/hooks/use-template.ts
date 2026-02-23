"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  getTemplate,
  addParticipant,
  removeParticipant,
  addPayment,
  removePayment,
  updateTemplateName,
  type LocalTemplate,
} from "~/lib/store";

const subscribers = new Set<() => void>();

function subscribe(callback: () => void) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}

function notifyAll() {
  for (const cb of subscribers) cb();
}

export function useTemplate(id: string) {
  const template = useSyncExternalStore(
    subscribe,
    () => getTemplate(id),
    () => undefined,
  );

  const rename = useCallback(
    (name: string) => {
      updateTemplateName(id, name);
      notifyAll();
    },
    [id],
  );

  const addMember = useCallback(
    (name: string) => {
      const result = addParticipant(id, name);
      notifyAll();
      return result;
    },
    [id],
  );

  const removeMember = useCallback(
    (participantId: string) => {
      removeParticipant(id, participantId);
      notifyAll();
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
      const result = addPayment(id, data);
      notifyAll();
      return result;
    },
    [id],
  );

  const removePaymentItem = useCallback(
    (paymentId: string) => {
      removePayment(id, paymentId);
      notifyAll();
    },
    [id],
  );

  return {
    template: template as LocalTemplate | undefined,
    rename,
    addMember,
    removeMember,
    addPaymentItem,
    removePaymentItem,
  };
}
