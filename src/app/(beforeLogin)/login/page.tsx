// import Main from "@/app/(beforeLogin)/_component/Main";

// export default function Login() {
  
//   return (
//     <Main />
//   )
// }
"use client";

import Image from "next/image";
import todoLogo from "../../../../public/BulletJournal.jpg";
import loginBtn from "../../../../public/login.png";
import axios from "axios";
import React, { useState } from "react";
import googleSignup from "../../public/signup.png";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Login() {
  //debugger;
  const { data, status } = useSession();
  if (status === 'authenticated') {
    return (
      <div>
        <h1> login success</h1>
        
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  const [loginSuccess, setLoginSuccess] = useState(false);
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const handleButtonClick = async () => {
    // await axios
    //   .post(`/oauth2/authorization/google`)
    //   .then(function (response) {debugger;
    //     if (response.status === 201) {//성공 accessToken, refreshToken
    //       setLoginSuccess(true);
    //     } else {//실패
    //       setLoginSuccess(false
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // signIn('google', {
    //   callbackUrl: '/home'
    // })

  }

  return (
    <div className="flex w-full h-full">
      <div className="w-2/4 flex items-center justify-center ">
        <Image style={{margin: "60px", height: "540px", borderRadius: "50px", border: "dashed red"}} src={todoLogo} alt="logo" />
      </div>
      <div className="w-2/4 flex flex-col justify-center">
        <p className="text-5xl font-bold mb-8">지금 일어나고 있는 일</p>
      <button onClick={() => signIn('google')}>
        <Image src={loginBtn} style={{width:"192px", height:"40px"}} alt="loginbutton"/>
      </button>


            
      </div>
    </div>
  )
}

