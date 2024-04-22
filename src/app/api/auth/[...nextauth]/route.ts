//  import NextAuth from "next-auth";
// // import CredentialsProvider from "next-auth/providers/credentials";
//   import GoogleProvider from "next-auth/providers/google";
// // // import KakaoProvider from 'next-auth/providers/kakao';
// // // import NaverProvider from 'next-auth/providers/naver';

// const handler = NextAuth({
//    pages: {
//      signIn: '/login',
//    },
//   //  callbacks: {
//   //     session({ session, newSession, user}) {
//   //       console.log('auth.ts session', session, newSession, user);
//   //       return session;
//   //     }
//   //   },
//   //   events: {
//   //     signOut(data: any) {
//   //       console.log('auth.ts events signout', 'session' in data && data.session, 'token' in data && data.token);
//   //       // if ('session' in data) {
//   //       //   data.session = null;
//   //       // }
//   //       // if ('token' in data) {
//   //       //   data.token = null;
//   //       // }
//   //     },
//   //     session(data: any) {
//   //       console.log('auth.ts events session', 'session' in data && data.session, 'token' in data && data.token);
//   //     }
//   //   },
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//         }),
// //         // KakaoProvider({
// //         //   clientId: process.env.KAKAO_CLIENT_ID as string,
// //         //   clientSecret: process.env.KAKAO_CLIENT_SECRET as string,
// //         // }),
// //         // NaverProvider({
// //         //   clientId: process.env.NAVER_CLIENT_ID as string,
// //         //   clientSecret: process.env.NAVER_CLIENT_SECRET as string,
// //         // }),
      
//      ],
//      callbacks: {
//       async signIn({ user, account, profile, email, credentials }) {
//         debugger;
//         return true
//       },
//     },
//       secret: process.env.NEXTAUTH_SECRET,
// });

//  export {handler as GET, handler as POST};
//export { GET, POST } from '@/auth';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

//import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // store the user id from MongoDB to session
      // const sessionUser = await User.findOne({ email: session?.user?.email });
      // if (session.user) {
      //   session.user.id = sessionUser._id.toString();
      // }
      console.log("session!:", session);
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        //server less function,this is lembda function, open up only when it is called
        // check if user already exists
        // const userExists = await User.findOne({ email: profile?.email });

        // // if not, create a new document and save user in MongoDB
        // if (!userExists) {
        //   await User.create({
        //     email: profile?.email,
        //     username: profile?.name?.replace(" ", "").toLowerCase(),
        //     image: profile?.picture,
        //   });
        // }
        console.log("signIn!:",  account, profile, user, credentials);

        return true;
      } catch (error: any) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };