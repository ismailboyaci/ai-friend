import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
        <Navbar />
        <div className="hidden md:flex mt-16 w-20 flex-col fixed inset-y-0">
          <Sidebar />
        </div>
      <main className="h-full md:pl-16 pt-20">
        {children}
      </main>
    </div>
  );
}
