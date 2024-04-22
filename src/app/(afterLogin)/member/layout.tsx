import {ReactNode} from "react";

type Props = { children: ReactNode, modal: ReactNode };
export default async function MemberLayout({ children, modal }: Props) {
  return (
    <div className="w-6/12 flex flex-col ml-40">
      {children}
      {modal}
    </div>
  );
}