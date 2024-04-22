import TodoDetail from "@/app/(afterLogin)/_component/TodoDetail";

const todoDetail: React.FC = (todoId) => {
  return (
    <>
      <TodoDetail todoId={todoId}/>
    </>
  );
};
export default todoDetail;