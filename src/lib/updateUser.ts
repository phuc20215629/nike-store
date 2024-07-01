"use server";

import { members } from "@wix/members";
import { wixClientServer } from "./wixClientServer";
import { z } from "zod";
import { ProfileSchema } from "@/schema";

export const updateUser = async (data: z.infer<typeof ProfileSchema>) => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  try {
    const response = await wixClient.members.updateMember(
      user.member?.contactId!,
      {
        contact: {
          firstName: data.firstname || user.member?.contact?.firstName,
          lastName: data.surname || user.member?.contact?.lastName,
          phones: [data.phone],
        },
        loginEmail: data.email || user.member?.loginEmail,
        profile: { nickname: data.username || user.member?.profile?.nickname },
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
