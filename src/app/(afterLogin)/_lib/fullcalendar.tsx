"use client"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import React, {useState, useEffect }  from 'react';
import axios from 'axios';

export interface props {
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
export default function Fullcalendar({...events}: props[]) {
  //const [events, setEvents] = useState([{title: 'event 1',start: '2024-02-02T10:00:00',end: '2024-02-02T11:00:00'}]);
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
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
    let draggableEl = document.getElementById("external-events");
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

    // setState((state) => {
    //   return {
    //     ...state,
    //     calendarEvents: state.calendarEvents.concat(newEvent)
    //   };
    // });
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
  );
}