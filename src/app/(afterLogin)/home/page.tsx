import TodoList from "@/app/(afterLogin)/_component/TodoList";
import Loading from "@/app/(afterLogin)/home/loading";
import {Suspense} from "react";

const Home: React.FC = () => {
    
  return (
    <>
    <Suspense fallback={<Loading/>}>
      <TodoList/>
    </Suspense>
    </>
  );
};
export default Home;