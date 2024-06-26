"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('/users/me', config);
      if (response.status === 200) {//여러번 타는 것 같음.
        const userInfo = response.data.result;
        const {name, email} = userInfo;
        setName(name);
        setEmail(email);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
 // useEffect hook을 사용하여 데이터 불러오기
 useEffect(() => {//왜 두번타냐?
  fetchData();
}, []); // useEffect 의존 배열은 비워둠 (데이터 한 번만 불러오기
const onLogout = () => {};

  return (
    <>
      <div
        id="section_title"
        className="flex justify-center items-center flex-col w-6/12 h-3/5 mx-auto my-12"
      >
        마이페이지
      </div>
      <div id="join_content" className="w-full h-full">
        <div
          id="member_wrap"
          className="mt-4 border flex"
        >
          <div className="m-0 h-full align-middle box-border pl-2 pt-3 pb-3 text-sm w-24 border-r bg-slate-200">
            이름
          </div>
          <input
            className="m-0 h-full align-middle box-border pl-2 pt-3 pb-3 text-sm w-full"
            id="my_name"
            type="text"
            name="name"
            value={name}
            readOnly
          />
        </div>

        <div
          id="member_wrap"
          className="mt-4 border flex"
        >
          <div className="m-0 h-full align-middle box-border pl-2 pt-3 pb-3 text-sm w-24 border-r bg-slate-200">
            이메일
          </div>
          <input
            className="m-0 h-full align-middle box-border pl-2 pt-3 pb-3 text-sm w-full"
            id="my_email"
            type="text"
            name="email"
            value={email}
            readOnly
          />
        </div>
        <div
          id="member_wrap"
          className="mt-4 border flex"
        >
          <button className="m-0 align-middle box-border py-3 text-sm w-full h-full bg-slate-200 text-center" onClick={onLogout}>
            로그아웃
            </button>
        </div>

      </div>
    </>  
  );
}
