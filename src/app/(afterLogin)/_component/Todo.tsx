import React from 'react';
import fix from '../../../../public/fix.png';
import trash from '../../../../public/trash.png';
import Image from "next/image";

interface TodoItem {
  id: string;
  title: string;
  content: string;
  date: string;
  checked: boolean;
  isFixed: boolean;
  type: string;
}

interface TodoProps {
  // isFixed: boolean;
  // type: string;
  // title: string;
  // content: string;
  // date: string;
  todo: TodoItem;
}
const Todo: React.FC<TodoProps> = ({ todo, onUpdate, onDelete, onClick}) => {
  const { id, isFixed, content, checked, title } = todo;//content가 아니라 title이어야 한다.
  const handleChange = (e) => {
    const checked = e.target.checked ? true : false;
    onUpdate({ ...todo, checked });
  };
  const handleDelete = (e) => onDelete(todo);
  const handleClick = (e) => {
    if (e.target.id === "checkTodo" || e.target.id === "deleteTodo") return;
    onClick(todo);
  }
  return (
    <div className='bg-slate-400 w-3/4 rounded-xl h-12 p-2 m-4' onClick={handleClick}>
      <div className='flex relative justify-center'>
        <input
        className='absolute start-0 w-6 h-6'
        type="checkbox"
        id="checkTodo"
        data-index={id}
        checked={checked === true}
        onChange={handleChange}
        />
        {isFixed && <Image src={fix} style={{ width: '30px', height: '30px', position: 'absolute', left: '24px'}} alt="fix" />}
        <label className=''>
          {title}
        </label>
        {/* <a href="https://www.flaticon.com/kr/free-icons/-" title="사용자 인터페이스 아이콘">사용자 인터페이스 아이콘 제작자: atomicicon - Flaticon</a> */}
        {/* {<a href="https://www.flaticon.com/kr/free-icons/" title="쓰레기통 아이콘">쓰레기통 아이콘 제작자: Freepik - Flaticon</a>} */}
        <button onClick={handleDelete} className='absolute right-0'>
          <Image src={trash} style={{ width: '30px', height: '30px'}} alt="trash" id="deleteTodo"/>
        </button>
      </div>
    </div>
  )
};

export default Todo;