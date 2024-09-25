'use client'
import { MapProvider } from "@/components/map/MapContext";
import SideNav from "@/components/nav/sideNav";
import Image from "next/image";
import React, { ReactNode, useContext } from "react";

interface LayoutProps {
  children: ReactNode; // This type comes from React and is suitable for children
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  
  return (
    // <div className="grid min-h-screen w-full md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] bg-gray-100">
    <MapProvider>
      <div className="flex min-h-screen w-full bg-gray-100">
        <SideNav />

        <div className="ml-64 p-4 overflow-auto w-full">{children}</div>
      </div>
    </MapProvider>
  );
};

export default Layout;
