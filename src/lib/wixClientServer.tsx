import { createClient, OAuthStrategy } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
import { members } from "@wix/members";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken;
  try {
    const cookie = cookies();
    refreshToken = JSON.parse(cookie.get("refreshToken")?.value || "{}");
  } catch (error) {
    console.log(error);
  }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
