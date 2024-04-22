import {ReactNode} from "react";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
//import AuthSession from "@/app/_component/AuthSession";

type Props = { children: ReactNode, modal: ReactNode };
export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    // <AuthSession>
    <div className="flex h-full ">
      <NavMenu />
      <main className=" bg-slate-200 p-6 ml-72 w-full h-full">{children}</main>
      {modal}
    </div>
    // </AuthSession>
  )
}