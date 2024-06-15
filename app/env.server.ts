import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    TURSO_APP_GROUP: z.string().min(1),
    APP_NAME: z.string().min(1),
    PUBLIC_APP_URL: z.string().url(),
    PUBLIC_DOMAIN: z.string().min(1),
  },
  runtimeEnv: process.env,
});
