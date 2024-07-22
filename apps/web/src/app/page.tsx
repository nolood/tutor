"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { FormEvent } from "react";
import { z } from "zod";
export default function Web() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    validatorAdapter: zodValidator(),
    onSubmit: ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };
  return (
    <div className="">
      <p className="text-3xl text-red-500">Hello</p>
      <Button color="primary">button</Button>
      <form onSubmit={handleSubmit}>
        <form.Field
          validators={{
            onChange: z.string().min(1, "First name is required"),
          }}
          name="firstName"
          children={(field) => (
            <Input
              name={field.name}
              color="primary"
              size="lg"
              type="text"
              label="Email"
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Field
          name="lastName"
          validators={{
            onChange: z.string().min(1, "Last name is required"),
          }}
          children={(field) => (
            <Input
              name={field.name}
              color="primary"
              size="lg"
              type="text"
              label="Email"
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <Button color="primary" type="submit">
          submit
        </Button>
      </form>
    </div>
  );
}
