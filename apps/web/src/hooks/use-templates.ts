"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  listTemplates,
  createTemplate,
  deleteTemplate,
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

function getSnapshot(): LocalTemplate[] {
  return listTemplates();
}

function getServerSnapshot(): LocalTemplate[] {
  return [];
}

export function useTemplates() {
  const templates = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const create = useCallback((name: string) => {
    const t = createTemplate(name);
    notifyAll();
    return t;
  }, []);

  const remove = useCallback((id: string) => {
    deleteTemplate(id);
    notifyAll();
  }, []);

  const rename = useCallback((id: string, name: string) => {
    updateTemplateName(id, name);
    notifyAll();
  }, []);

  return { templates, create, remove, rename };
}
