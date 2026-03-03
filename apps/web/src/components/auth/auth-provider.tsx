"use client";

import { useEffect } from "react";

import { ensureSession } from "~/lib/supabase/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void ensureSession();
  }, []);

  return <>{children}</>;
}
