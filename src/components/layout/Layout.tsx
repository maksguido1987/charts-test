import { FC, ReactNode } from "react";
import { Header } from "../header/Header";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
};
