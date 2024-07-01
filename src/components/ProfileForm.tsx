"use client";

import { updateUser } from "@/lib/updateUser";
import { ProfileSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { members } from "@wix/members";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";

const ProfileForm = ({
  user,
}: {
  user: members.GetMyMemberResponse &
    members.GetMyMemberResponseNonNullableFields;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      username: user.member?.profile?.nickname || "",
      email: user.member?.loginEmail || "",
      firstname: user.member?.contact?.firstName || "",
      surname: user.member?.contact?.lastName || "",
      phone: user.member?.contact?.phones
        ? user.member?.contact?.phones[0]
        : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    setIsLoading(true);
    if (await updateUser(data)) {
      toast({
        title: "Nice!",
        description: "Update successfully!",
        duration: 4000,
      });
    } else {
      toast({
        title: "Uh oh!",
        variant: "destructive",
        description: "Failed to update profile!",
        duration: 4000,
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-[540px]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-between">
              <div className="flex flex-col gap-2 w-[47%]">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="john" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 w-[47%]">
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Surname</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" placeholder="doe" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="0123456789" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-full">
              {isLoading ? <span className="loader" /> : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
