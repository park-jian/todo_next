import {ReactNode} from "react";

type Props = { children: ReactNode, modal: ReactNode };
export default async function HomeLayout({ children, modal }: Props) {
  return (
    <div className="">
      {children}
      {modal}
    </div>
  );
}