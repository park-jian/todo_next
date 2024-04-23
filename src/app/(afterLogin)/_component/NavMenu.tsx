"use client";
import profile from "../../../../public/profile.png";
import add from "../../../../public/add.png";
import search from "../../../../public/search.png";
import todo from "../../../../public/todo.png";
import calendar from "../../../../public/calendar.png";
import home from "../../../../public/home.png";
import Image from "next/image";
import Link from "next/link";
import axios from 'axios';
import React, {useState, useEffect, useCallback}  from 'react';

export default function NavMenu() {
  const [name, setName] = useState("DAILY");
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
  let fetchUrl = '/users/me';
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(fetchUrl, config);
       if (response.status === 200) {//여러번 타는 것 같음.
         const userInfo = response.data.result;
         const {name, email} = userInfo;
         setName(name);
       }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [fetchUrl, config]);
  useEffect(() => {//왜 두번타냐?
    fetchData();
  }, [fetchData]); // useEffect 의존 배열은 비워둠 (데이터 한 번만 불러오기

  return (
      <div id="navbar" className="w-72 p-8 fixed bg-slate-300 h-full">
        <Link href="/home">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={home} alt="home" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
          <span className='w-full'>
            HOME
          </span>
          </div>
        </div>
        </Link>

        <Link href="/member/mypage">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={profile} alt="profile" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="w-full">
              {name}
            </span>
          </div>
        </div>
        </Link>

        <Link href="/todo/add">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={add} alt="add" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="w-full text-red-700 font-bold">
              작업 추가
            </span>
          </div>
        </div>
        </Link>

        <Link href="/search">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={search} alt="search" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="w-full">
              검색
            </span>
          </div>
        </div>
        </Link>

        <Link href="/todo/todolist/daily">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={todo} alt="todo" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="w-full">
              일별 조회
            </span>
          </div>
        </div>
        </Link>

        <Link href="/todo/todolist/monthly">
        <div className="w-full h-12 flex mb-3">
          <div className="mr-3 flex justify-center items-center">
            <Image src={calendar} alt="calendar" width={36} height={36}/>
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="w-full">
              월별 조회
            </span>
          </div>
        </div>
        </Link>

      </div>
  )
}