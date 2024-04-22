"use client";

import style from './AddTodoModal.module.css';
import {useRouter, useSearchParams } from "next/navigation";
import axios from 'axios';
import {ChangeEventHandler, FormEventHandler, useState, useEffect} from "react";
import Link from "next/link";

export default function TodoDetail() {
  const selectList = ["DAILY", "WEEKLY", "YEARLY"];
  const [todoType, setTodoType] = useState("");
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [todoFixed, setTodoFixed] = useState(false);
  const [todoChecked, setTodoChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
  const searchParams = useSearchParams();
  const todoId = searchParams.get('todoId');
  const fetchData = async () => {
    try {
      const response = await axios.get(`/todos/${todoId}`, config);

      if (response.status === 200) {//여러번 타는 것 같음.
        const todoList = response.data.result;
        console.log("todoList:", todoList);
        const { type, title, isFixed, date, content, checked } = todoList;
        setTodoType(type || "");
        setTodoTitle(title || "");
        setTodoFixed(isFixed || false);
        setTodoDate(date || "");
        setTodoContent(content || "");
        setTodoChecked(checked || false);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); // useEffect 의존 배열은 비워둠 (데이터 한 번만 불러오기
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "type":
        setTodoType(value);
        break;
      case "title":
        setTodoTitle(value);
        break;
      case "content":
        setTodoContent(value);
        break;
      case "date":
        setTodoDate(value);
        break;
      case "isFixed":
        setTodoFixed(e.target.checked);
        break;
      default:
        break;
    }
  };
  const handleCanCelModal = (e) => {
    e.preventDefault(); // 기본 이벤트 방지
    setTodoType("");
    setTodoDate("");
    setTodoContent("");
    setTodoFixed(false);
    setTodoTitle("");
    router.back();
  };
  const handleSubmit: FormEventHandler = async (e) => {//값이 하나라도 없으면 에러 띄우기
    e.preventDefault(); // 기본 이벤트 방지
    const formData = {
      type: todoType,
      title: todoTitle,
      date: todoDate,
      content: todoContent,
      isFixed: todoFixed
    };
    try {
      const response = await axios.patch(`/todos/${todoId}`, formData, config);
      if (response.status === 200) {
        console.log('Todo updated successfully:', response.data);
        closePopup();
        router.back();
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      closePopup();
      router.back();
    }
  };

  return (
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div>TodoDetail</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.modalBody}>
              <div className={style.todoType}>
                <div>
                  <select id="type" onChange={handleInputChange} value={todoType}>
                    {selectList.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>고정</label>
                  <input type="checkbox" id="isFixed" className="ml-2" onChange={handleInputChange} checked={todoFixed}/>
                </div>
              </div>
              <div id="todoContent" className={style.todoContent}>
                <div id="totoContentHeader" className={style.inputDiv}>
                  <input id="title" className={style.totoContentTitle} type="text" placeholder="title" value={todoTitle} onChange={handleInputChange}/>
                  <input id="date" type="date" className={style.totoContentTitleDate} placeholder="date" value={todoDate} onChange={handleInputChange}/>
                </div>
                <div id="todoContent" className={style.todoContentMain}>
                  <textarea id="content" value={todoContent} onChange={handleInputChange}></textarea>
                </div>
              </div>
              
            </div>
            <div className={style.modalFooter}>
              <button className={style.footerButton} onClick={handleCanCelModal}>
                  취소
              </button>
              <button className={style.footerButton}>할일 수정</button>
            </div>
          </form>
        </div>
      </div>
    )
}