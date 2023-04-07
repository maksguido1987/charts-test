import { FC, ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-full">
      <Header />
      <main className="p-2 sm:p-4 grow">{children}</main>
      <Footer />
    </div>
  );
};
