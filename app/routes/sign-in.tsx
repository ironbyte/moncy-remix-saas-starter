import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import {
  json,
  redirect,
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

import { createSupabaseServerClient } from "~/utils/supabase.server";
import { CheckboxField, Field } from "~/components/forms";
import { Button } from "~/components/ui/button";
import { Divider } from "~/components/ui/divider";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spacer } from "~/components/ui/spacer";

export const schema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.string().optional().transform(Boolean),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  // const submission = await parseWithZod(formData, { schema });
  const intent = formData.get("intent");
  const { supabaseClient, headers } = createSupabaseServerClient(request);

  console.log(intent);

  if (intent === "auth-with-discord") {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    console.log("SUPABASE data: ", data);
    console.log("SUPABASE error: ", error);

    if (data) {
      return redirect(data.url, { headers });
    }
  }
  // Send the submission back to the client if the status is not successful
  // if (submission.status !== 'success') {
  //   return submission.reply();
  // }

  const session = null;

  // if (!session) {
  //   return submission.reply({
  //     formErrors: ['Incorrect username or password'],
  //   });
  // }

  return redirect("/");
}

export default function SignIn() {
  const lastResult = useActionData<typeof action>();

  // The useForm hook will return all the metadata we need to render the form
  // and put focus on the first invalid field when the form is submitted
  const [form, fields] = useForm({
    // This not only syncs the error from the server
    // But is also used as the default value of the form
    // in case the document is reloaded for progressive enhancement
    lastResult,
    onValidate({ formData }) {
      // Run the same validation logic on client
      return parseWithZod(formData, { schema });
    },
    constraint: getZodConstraint(schema),
    // Validate field once user leaves the field
    shouldValidate: "onBlur",
    // Then, revalidate field as user types again
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex min-h-full flex-col justify-center pb-32 pt-20">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-h1 text-4xl font-bold">Welcome back!</h1>
        <p className="text-body-md text-muted-foreground">
          Sign in to your account.
        </p>
      </div>
      <Spacer size="xs" />
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 px-8 py-2">
        <Form method="post" noValidate>
          <Button className="w-full" name="intent" value="auth-with-discord">
            {/*            <Icon name="github" size="font" className="mr-2" />
             */}
            Continue with Discord
          </Button>
        </Form>
        <Button type="submit" className="w-full">
          {/*<Icon name="google" size="font" className="mr-2" /> */}
          Continue with Google
        </Button>
      </div>

      <Form
        method="post"
        {...getFormProps(form)}
        className="mx-auto w-full max-w-md px-8 py-2"
      >
        <Divider />
        <Field
          labelProps={{ children: "Email" }}
          inputProps={{
            ...getInputProps(fields.email, {
              type: "email",
            }),
            autoFocus: true,
          }}
          errors={fields.email.errors}
        />
        <Field
          labelProps={{ children: "Password" }}
          inputProps={{
            ...getInputProps(fields.password, { type: "password" }),
            autoComplete: "current-password",
          }}
          errors={fields.password.errors}
        />
        <div className="flex justify-between">
          <CheckboxField
            labelProps={{
              children: "Remember me",
            }}
            buttonProps={getInputProps(fields.rememberMe, {
              type: "checkbox",
            })}
            errors={fields.rememberMe.errors}
          />
          <div className="flex justify-between">
            <Link to="/forgot-password" className="text-body-xs font-semibold">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
        <div className="flex justify-center py-2 text-sm font-semibold text-destructive">
          {form.errors}
        </div>
        <hr className="my-8 text-sky-500" />
      </Form>

      <div className="flex items-center justify-center gap-2">
        <span className="text-muted-foreground">
          Don&apos;t have an account?
        </span>
        <Link to="/sign-up" className="text-body-xs font-semibold underline">
          Sign Up Now
        </Link>
      </div>
    </div>
  );
}
