import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { SanityAdapter, SanityCredentials } from 'next-auth-sanity';
import client from '../../../client';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
    SanityCredentials(client) // only if you use sign in with credentials
  ],
  session: {
    jwt: true
  },
  adapter: SanityAdapter(client),
  pages: {
    signIn: '/login',
    error: '/login'
  },
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl)
        ? url
        : baseUrl
    }
  }
})