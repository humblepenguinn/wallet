import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        secret_key: { label: "secret_key", type: "secret_key" },
      },
      async authorize(credentials) {
        const { secret_key } = credentials as { secret_key: string };

        const response = await axios.get(`http://127.0.0.1:8000/does_wallet_exist/${secret_key}`)


        if (response.data === true) {

          return { id: Math.random().toString(36).substr(2, 9), name: secret_key };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
