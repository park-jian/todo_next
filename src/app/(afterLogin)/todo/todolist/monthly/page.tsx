"use client";
import Fullcalendar from "@/app/(afterLogin)/_lib/fullcalendar";
import axios from 'axios';
import React, {useState, useEffect }  from 'react';

export interface props {
  id: string;
  title: string;
  date?: string;
  start?: string
}
export default function Monthly() {
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
  //type props = { id: string, title: string, date: string };
  const [events, setEvents] = useState<props[]>([]);
    const fetchData = async () => {
      try {
        const response = await axios.get('/todos/daily', config);
        if (response.status === 200) {//여러번 타는 것 같음.
          
          const todoList: props[] = response.data.result.todoList;
          const updateEvents = todoList.map(obj => ({
            id: obj.id,
            title: obj.title,
            start: obj.date, // date를 start로 바꿉니다.
          }));
          setEvents(updateEvents);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
   // useEffect hook을 사용하여 데이터 불러오기
   useEffect(() => {//왜 두번타냐?
    fetchData();
  }, []); // useEffect 의존 배열은 비워둠 (데이터 한 번만 불러오기

  return (
    <Fullcalendar events={events}/>
  )
}