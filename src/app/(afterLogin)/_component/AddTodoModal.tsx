"use client";

import style from './AddTodoModal.module.css';
import {useRouter} from "next/navigation";
import axios from 'axios';
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import Link from "next/link";

export default function AddTodoModal({open}: any) {
  const selectList = ["DAILY", "WEEKLY", "YEARLY"];
  const [todoType, setTodoType] = useState("DAILY");
  const [todoDate, setTodoDate] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [todoFixed, setTodoFixed] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [isOpen, setIsOpen] = useState(open);
  const router = useRouter();

  ////const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {  HTMLSelectElement || HTMLInputElement || HTMLTextAreaElement 3개를 모두 포함하는 하나의 타입??
  //https://merrily-code.tistory.com/157
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    switch (id) {
      case "type":
        setTodoType(value);
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
      case "title":
        setTodoTitle(value);
        break;
      default:
        break;
    }
  };
  // const handleCanCelModal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const handleCanCelModal = (e: any) => {
    e.preventDefault(); // 기본 이벤트 방지
    //넣은것 취소 해야함.
    setTodoType("DAILY");
    setTodoDate("");
    setTodoContent("");
    setTodoFixed(false);
    setTodoTitle("");
    router.back();
  };
  const handleSubmit: FormEventHandler = async (e) => {//값이 하나라도 없으면 에러 띄우기
    e.preventDefault();
    const config = {
      headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
    };
    const openPopup = () => {
      setIsOpen(true);
    };
    const closePopup = () => {
      setIsOpen(false);
    };
    e.preventDefault(); // 기본 이벤트 방지
    const formData = {
      type: todoType,
      title: todoTitle,
      date: todoDate,
      content: todoContent,
      isFixed: todoFixed
    };
    try {
      const response = await axios.post('/todos', formData, config);
      if (response.status === 200) {
        closePopup();
        console.log('Todo added successfully:', response.data);//debugger;
        router.push('/home');
      }
    } catch (error) {
      //넣은것 reset해야함.
      closePopup();
      router.back();//갱신된 페이지를 보여줘야함
      console.error('Error adding todo:', error);
    } finally {
      
    }
  };

  return (
    <>
    {isOpen && ( 
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div>Todo</div>
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
                  <input type="checkbox" id="isFixed" className="ml-2" onChange={handleInputChange}/>
                </div>
              </div>
              <div id="todoContent" className={style.todoContent}>
                <div id="totoContentHeader" className={style.inputDiv}>
                  <input id="title" value={todoTitle} className={style.totoContentTitle} type="text" placeholder="title"  onChange={handleInputChange}/>
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
              <button className={style.footerButton}>할일 추가</button>
            </div>
          </form>
        </div>
      </div>
   )}
   </>
    )
}