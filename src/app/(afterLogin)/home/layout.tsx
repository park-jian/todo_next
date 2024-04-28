import {ReactNode} from "react";

type Props = { children: ReactNode, modal: never };
export default function HomeLayout({ children, modal }: Props) {
  return (
    <div className="">
      {children}
      {modal}
    </div>
  );
}