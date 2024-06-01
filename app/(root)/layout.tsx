import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <main>
        <p className="text-white-1">Left</p>
        {children}
        <p className="text-white-1">Right</p>
      </main>
    </div>
  );
}
