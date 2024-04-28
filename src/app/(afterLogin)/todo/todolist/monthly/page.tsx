"use client";
import axios from 'axios';
import React, {useState, useEffect }  from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

export interface EventProps {
  id: string;
  title: string;
  date?: string;
  start?: string
}
interface ExternalEvent {
  title: string;
  color: string;
  id: string;
  content: string;
}
export default function Monthly() {
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
  //type props = { id: string, title: string, date: string };
  const [events, setEvents] = useState<EventProps[]>([]);
    const fetchData = async () => {
      try {
        const response = await axios.get('/todos/daily', config);
        if (response.status === 200) {//여러번 타는 것 같음.
          const todoList: EventProps[] = response.data.result.todoList;
          const updateEvents = todoList.map(obj => ({
            id: obj.id,
            title: obj.title,
            date: obj.date,
            start: obj.date // date를 start로 바꿉니다.
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

  //const [state, setState] = useState<{ externalEvents: ExternalEvent[]; calendarEvents: props[] }>({
    const [state, setState] = useState<{ externalEvents: ExternalEvent[] }>({
    externalEvents: [
      { title: "책반납", color: "#0097a7", id: '34432', content: "도서관 책반납" },
      { title: "자전거 수리", color: "#f44336", id: '323232', content: "자전거 수리후 보관" },
      { title: "뮤지컬 보기", color: "#f57f17", id: '1111', content: "뮤지컬 보기" },
      { title: "헬스등록", color: "#90a4ae", id: '432432', content: "헬스 후 치킨뜯어" }
    ]
    //, calendarEvents: events 
  });
  useEffect(() => {
    let draggableEl = document.getElementById("external-events") as HTMLElement;
    console.log("fullCalendar호출:", draggableEl);
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let id = eventEl.dataset.id;
        let title = eventEl.getAttribute("title");
        let color = eventEl.dataset.color;
        let content = eventEl.dataset.content;

        return {
          id: id,
          title: title,
          color: color,
          content: content,
          create: true
        };
      }
    });
  }, [state.externalEvents]);

  const handleEventReceive = (eventInfo: any) => {
    const newEvent = {
      id: eventInfo.draggedEl.getAttribute("data-id"),
      title: eventInfo.draggedEl.getAttribute("title"),
      color: eventInfo.draggedEl.getAttribute("data-color"),
      start: eventInfo.date,
      content: eventInfo.draggedEl.getAttribute("data-content")
    };
  };
  return (
    <>
    <div id="external-events">
          {state.externalEvents.map((event) => (
            <div
              className="fc-event fc-h-event mb-1 fc-daygrid-event fc-daygrid-block-event p-2 flex"
              title={event.title}
              data-id={event.id}
              data-color={event.color}
              data-content={event.content}
              key={event.id}
              style={{
                backgroundColor: event.color,
                borderColor: event.color,
                cursor: "pointer"
              }}
            >
              <div className="fc-event-main flex">
                <div className="mr-6 w-20">
                  <strong>{event.title}</strong>
                </div>
                {event.content}
              </div>
            </div>
          ))}
        </div>


    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
      headerToolbar={{
        left: 'prev,today,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }}
      initialView="dayGridMonth"
      timeZone= 'local'
      editable={true}
      selectable={true}
      selectMirror={true}
      dayMaxEvents={true}
      weekends={true}
      droppable={true}
      events={events}
      eventReceive={handleEventReceive}
    />
    </>
  )
}