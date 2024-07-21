"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
export default function Web() {
  return (
    <div className="">
      <p className="text-3xl text-red-500">Hello</p>
      <Button color="primary">button</Button>
      <Input color="primary" size="lg" type="email" label="Email" />
    </div>
  );
}
