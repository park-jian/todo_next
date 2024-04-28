import {ReactNode} from "react";
import LeftNavMenu from "@/app/(afterLogin)/_component/LeftNavMenu";
import style from '@/app/(afterLogin)/layout.module.css';
//import AuthSession from "@/app/_component/AuthSession";

type Props = { children: ReactNode, modal: ReactNode };
export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    // <AuthSession>
    <div className="flex">
      <LeftNavMenu/>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className="p-6 ml-72 w-full h-full">{children}</main>
          <section className={style.rightSection}>
            <div className={style.rightContent}>
              <h3>오른쪽 영역</h3>
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
    // </AuthSession>
  )
}