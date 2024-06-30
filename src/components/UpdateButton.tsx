"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    if (!pending) {
      toast({
        title: "Nice",
        description: "Update successfully",
        duration: 4000,
      });
    }
  }, [pending]);

  return (
    <Button disabled={pending}>{pending ? "Updating..." : "Update"}</Button>
  );
};

export default UpdateButton;
