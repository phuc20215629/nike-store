"use client";

import { useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useToast } from "./ui/use-toast";

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
    <button
      disabled={pending}
      className="bg-red-400 text-white p-2 rounded-md cursor-pointer disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96"
    >
      {pending ? "Updating..." : "Update"}
    </button>
  );
};

export default UpdateButton;
