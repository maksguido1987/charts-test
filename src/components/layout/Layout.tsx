import { FC, ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";

interface Props {
  children: ReactNode;
  title?: string;
}

export const Layout: FC<Props> = ({ title, children }) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col min-h-full">
      <Header />
      <main className="p-2 sm:p-4 grow">
        {title && (
          <h2 className="text-3xl font-semibold mb-4 mt-0 text-gray-700">{title}</h2>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};
