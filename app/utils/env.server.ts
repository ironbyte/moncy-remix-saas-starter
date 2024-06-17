import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    APP_NAME: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    PUBLIC_APP_URL: z.string().url(),
    PUBLIC_DOMAIN: z.string().min(1),
    SUPABASE_ANON_KEY: z.string().min(1),
    SUPABASE_URL: z.string().min(1),
  },
  runtimeEnv: process.env,
});
