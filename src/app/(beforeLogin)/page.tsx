"use client";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";
// import {auth} from "@/auth";
import {redirect} from "next/navigation";

const Home = () => {
  const { data: session } = useSession();
  // const session = await auth();
  // if (session?.user) {
  //   redirect('/home');
  //   return null;
  // }
  return (
    <Main />
  )
}
export default Home;