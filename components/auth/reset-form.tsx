"use client";

import { useTransition,  useState } from "react";
import * as z from "zod";

import { ResetEmailSchema } from "@/schemas";
import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { reset } from "@/actions/reset";



function ResetForm() {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
    
  const form = useForm<z.infer<typeof ResetEmailSchema>>({
    resolver: zodResolver(ResetEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetEmailSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

    return (
        <CardWrapper
            backButtonHref="/auth/signin"
            backButtonLabel="Back to login"
            headerLabel="Reset password"
            showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="me@ayush.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error } />
            <FormSuccess message={success} />
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default ResetForm;
