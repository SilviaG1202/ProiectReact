import NextAuth, {Session, User} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from 'next-auth/jwt';

import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/lib/firebase";

// Define a custom user type that extends the default User type from NextAuth
interface CustomUser extends User 
{
  firebaseUid?: string;
}

// Extend the default Session type to include the custom user type
interface CustomSession extends Session 
{
  user?: CustomUser;
}

export const authOptions = 
{
  pages: 
  {
    signIn: '/login'
  },

  providers: 
  [
    CredentialsProvider(
      {
        name: 'Credentials',
        credentials: {},
        async authorize(credentials): Promise<any> 
        {
          return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
            .then(userCredential => 
              {
                if (userCredential.user) 
                  {
                    return userCredential.user;
                  }
                return null;
              })
            .catch(error => (console.log("Error Credentials Provide", error)))
            .catch((error) => 
            {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log("Error Code", errorCode, "Error Message", errorMessage);
              console.log(error);

             });
        }
      }),

      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })

  ],

    callbacks: 
    {

      // Then use your CustomUser type in the jwt callback
      async jwt({ token, user }: { token: JWT, user?: CustomUser }) 
      {
        if (user?.firebaseUid) 
        {
          token.firebaseUid = user.firebaseUid;
        }
        return token;
      },

    }

};

export default NextAuth(authOptions)