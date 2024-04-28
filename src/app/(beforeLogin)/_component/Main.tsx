"use client";

import Image from "next/image";
import todoLogo from "../../../../public/BulletJournal.jpg";
import loginBtn from "../../../../public/login.png";
import axios from "axios";
import React, { useState } from "react";
import googleSignup from "../../public/signup.png";
import Link from "next/link";
//import { useSession, signIn, signOut } from 'next-auth/react';

export default function Main() {
  //const { data: session, status } = useSession();
  // if (status === 'authenticated') {
  //   return (
  //     <div>
  //       <h1> login success</h1>
        
  //       <button onClick={() => signOut()}>sign out</button>
  //     </div>
  //   );
  // }
  const [loginSuccess, setLoginSuccess] = useState(false);
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const handleButtonClick = async () => {debugger;
    await axios
      //.post(`/oauth2/authorization/google`)
      .post(`https://jobava.online/oauth2/authorization/google`)
      .then(function (response) {debugger;
        if (response.status === 201) {//성공 accessToken, refreshToken
          setLoginSuccess(true);
        } else {//실패
          setLoginSuccess(false)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // signIn('google', {
    //   callbackUrl: '/home'
    // })

  }

  return (
    <div className="flex w-full h-full">
      {/* {session ? ( //세션 정보가 있으면 signOut()호출
        <button onClick={() => signOut()}>Logout</button>
      ) : ( */}
        <>
          <div className="w-2/4 flex items-center justify-center ">
            <Image style={{margin: "60px", height: "540px", borderRadius: "50px", border: "dashed red"}} src={todoLogo} alt="logo" priority={true}/>
          </div>
          <div className="w-2/4 flex flex-col justify-center">
            <p className="text-5xl font-bold mb-8">지금 일어나고 있는 일</p>
            <button onClick={handleButtonClick}>
              <Image src={loginBtn} width={192} height={40} style={{width:"192px", height:"40px"}} alt="loginbutton" priority={true}/>
            </button>
          </div>
        </>
      {/* )} */}
    </div>
  )
}

