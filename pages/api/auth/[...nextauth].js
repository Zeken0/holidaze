import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "Email",
          placeholder: "admin@admin.com",
        },
        password: {
          label: "Password",
          type: "Password",
        },
      },
      authorize: (credentials) => {},
    }),
  ],
});
