import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { jwtDecode, JwtPayload } from "jwt-decode";

type UserDecoded = JwtPayload & {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string,
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string,
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string
}

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        const base_url = process.env.NEXT_PUBLIC_BASE_URL_API;
        const { email, password } = credentials;
        const res = await fetch(`${base_url}/api/Account/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
          cache: 'no-cache'
        })

        const data = await res.json()

        if (data.message === "Login completed") {
          const decoded = jwtDecode<UserDecoded>(data.token);
          console.log(decoded)

          const user = {
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            name: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
            role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
            exp: decoded.exp
          };
          return user
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, account, profile }) {

      if (user) {
        token.id = user.id
        token.email = user.email
        // @ts-ignore
        token.role = user.role
        // @ts-ignore
        token.exp = user.exp
        
        return token
      }
      return token
    },

    async session({ session, token, user, trigger, newSession }) {
      // @ts-ignore
      session.user.id = token?.id || ''
      // @ts-ignore
      session.user.role = token?.role || ''
      // @ts-ignore
      session.expires = new Date(token?.exp * 1000)

      return session
    },
  },
  pages: {
    signIn: '/sign-in' //sigin page
  },
} satisfies NextAuthConfig;

export default authConfig;
