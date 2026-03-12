import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

/**
 * NextAuth با Google OAuth 2.0 برای Web Server Applications (مطابق داکیومنت رسمی گوگل):
 * - response_type=code: فلوی Authorization Code (الزامی برای وب سرور)
 * - redirect_uri: در Google Console باید دقیقاً با NEXTAUTH_URL + /api/auth/callback/google مطابقت داشته باشد
 * - state: NextAuth به‌صورت خودکار برای CSRF تولید و اعتبارسنجی می‌کند
 * - تبادل authorization code با access/id_token فقط سمت سرور انجام می‌شود
 * @see https://developers.google.com/identity/protocols/oauth2/web-server
 */
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          response_type: "code",
          access_type: "offline",
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        session.idToken = token.idToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
