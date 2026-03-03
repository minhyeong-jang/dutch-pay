"use client";

import type { Provider } from "@supabase/supabase-js";

import { createClient } from "./client";

export async function ensureSession() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const { error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
  }
}

export async function getAuthStatus() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    isAuthenticated: !!user,
    isAnonymous: user?.is_anonymous ?? false,
    user,
  };
}

export async function linkAnonymousToProvider(
  provider: Provider,
  redirectTo: string,
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.is_anonymous) {
    return { data: null, error: null, alreadyLinked: true };
  }

  const { data, error } = await supabase.auth.linkIdentity({
    provider,
    options: { redirectTo },
  });

  return { data, error, alreadyLinked: false };
}
