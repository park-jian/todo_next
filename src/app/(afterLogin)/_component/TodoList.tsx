"use client";
import React, {useState, useEffect }  from 'react';
import Todo from "@/app/(afterLogin)/_component/Todo";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TodoItem {
  id: number;
  title: string;
  content: string;
  date: string;
  checked: boolean,
  isFixed: boolean;
  type: string;
}
const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<TodoItem[]>([]); // 상태 변수 선언
  const router = useRouter();
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}` },
  };
    const fetchData = async () => {
      try {
        const response = await axios.get('/todos/daily', config);
        if (response.status === 200) {//여러번 타는 것 같음.
          const todoList = response.data.result.todoList;
          setTodo(todoList);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
   // useEffect hook을 사용하여 데이터 불러오기
   useEffect(() => {//왜 두번타냐?
    fetchData();
  }, []); // useEffect 의존 배열은 비워둠 (데이터 한 번만 불러오기

  const sortedTodoList = todo.sort((a: TodoItem, b: TodoItem) => {
    if (a.isFixed && !b.isFixed) {
      return -1;
    } else if (!a.isFixed && b.isFixed) {
      return 1;
    } else {
      return 0;
    }
  });
  const handleUpdate = async (updated: TodoItem) => {//debugger;
    //기존todo item의 id가 우리가 update 하고자 하는 id와 동일하면 updated된 객체로 map해줌. 그렇지 않다면 기존 t를 그대로 사용한다.
    try {//수정 권한이 없음
      // PATCH 요청 보내기
      const response = await axios.patch(`/todos/check/${updated.id}`, config);
      if (response.status === 200) fetchData();
      // 성공적으로 업데이트되었을 때의 처리
      console.log(`Todo with id ${updated.id} check status updated successfully`);
    } catch (error) {
      // 업데이트 중 오류 발생 시의 처리
      console.error('Error updating todo check status:', error);
    }
  }
  const handleDelete = async (deleted: TodoItem) => {
    try {
      const response = await axios.delete(`/todos/${deleted.id}`, config);
      if (response.status === 200) fetchData();
    } catch (error) {
      console.error('Error delete todo:', error);
    }
  }
  const handleClick = async (updated: TodoItem) => {
    router.push(`/todo/todoDetail/?todoId=${updated.id}`);
  } 
  return (
    <>
    
       {sortedTodoList.map((todo: TodoItem, index: number) => (
        <Todo key={todo.id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} onClick={handleClick}/>
      ))}
    </>
  );
};
export default TodoList;