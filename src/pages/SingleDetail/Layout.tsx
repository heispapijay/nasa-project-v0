import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
