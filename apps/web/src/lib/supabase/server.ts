import type { CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import { env } from "~/env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: Parameters<
            NonNullable<CookieMethodsServer["setAll"]>
          >[0],
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Component에서는 쿠키 설정이 불가능할 수 있음
          }
        },
      },
    },
  );
}
