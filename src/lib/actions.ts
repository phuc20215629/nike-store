"use server";

import { members } from "@wix/members";
import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData: FormData) => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  const id = formData.get("id") as string;
  const username = formData.get("username") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  let defPhone =
    user.member?.contact?.phones && user.member?.contact?.phones[0];
  if (!defPhone) defPhone = "0123456789";

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstName || user.member?.contact?.firstName,
        lastName: lastName || user.member?.contact?.lastName,
        phones: [phone].length === 10 ? [phone] : [defPhone],
      },
      loginEmail: email || user.member?.loginEmail,
      profile: { nickname: username || user.member?.profile?.nickname },
    });
  } catch (err) {
    console.log(err);
  }
};
