import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function SignIn() {
  return <div className="flex flex-col"></div>;
}
