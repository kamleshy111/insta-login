import { NextAuthOptions } from "next-auth"

// Instagram OAuth provider configuration
const InstagramProvider = {
  id: "instagram",
  name: "Instagram",
  type: "oauth" as const,
  version: "2.0",
  scope: "user_profile,user_media",
  params: { grant_type: "authorization_code" },
  accessTokenUrl: "https://api.instagram.com/oauth/access_token",
  authorizationUrl: "https://api.instagram.com/oauth/authorize",
  profileUrl: "https://graph.instagram.com/me",
  profile(profile: {
    id: string;
    username: string;
    profile_picture_url?: string;
  }) {
    return {
      id: profile.id,
      name: profile.username,
      email: null,
      image: profile.profile_picture_url,
    }
  },
  clientId: process.env.INSTAGRAM_CLIENT_ID,
  clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
}

export const authOptions: NextAuthOptions = {
  providers: [InstagramProvider],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.username = account.username
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      ;(session as any).accessToken = token.accessToken
      ;(session as any).refreshToken = token.refreshToken
      ;(session as any).username = token.username
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
} 