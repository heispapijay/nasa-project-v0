import React from "react";
import headImage from "../../assets/spherewave.gif";

type LayoutProps = {
  children: React.ReactNode;
  pagination?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children, pagination }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <header className="p-4 flex flex-col items-center justify-center">
        <img
          src={headImage}
          alt="loading"
          className="w-24 h-24 mix-blend-screen z-[-1]"
        />
        <h1 className="text-3xl font-bold text-center">NASA Search</h1>
      </header>

      <main className="flex flex-col justify-center items-center p-4 w-full max-w-[1280px]">
        {children}
      </main>

      <footer className="text-white text-center p-2 w-full">
        {pagination}
      </footer>
    </div>
  );
};
