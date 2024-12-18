import React from 'react'
import Image from 'next/image'
import { IoIosLogOut } from "react-icons/io";
import { VscPreview } from "react-icons/vsc";
import { TfiDashboard } from "react-icons/tfi";
import { useLogout } from '@/hooks/auth/useLogout';
import { useNav } from '@/hooks/useNav';

import Link from 'next/link';
const   SideNav:React.FC = () => {
  const {handleDashboard, handleUlasanTeknikal} = useNav();
  const {handleLogout} = useLogout();
  
  return (
    <div className="bg-blue-600 text-white p-4 min-h-screen flex flex-col fixed top-0 left-0 print:hidden">
        {/* Logo Section */}
        <div className="mb-4 flex flex-col items-center">
          <Image
            src="/ulasan-teknikal/assets/logo/logo_jpsselgis.png"
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
          <hr className="my-4 border-gray-200 w-full" />
        </div>

        {/* Menu and Logout Section */}
        <div className="flex flex-col justify-between flex-grow">
          {/* Menu Section */}
          <div>
            <div onClick={handleDashboard} className="flex items-center cursor-pointer text-white mb-4 gap-4 text-base hover:bg-black hover:rounded-lg transition-all duration-300 ease-in-out py-2 px-4">
              <span className='text-xl'><VscPreview/></span>
              <span className='text-base'>Halaman Utama</span>
            </div>
            <Link href="https://jpsselgis.selangor.gov.my/portal/apps/opsdashboard/index.html#/c8be80aa051e4316ae3e446a5d9b4785" target='_blank' className="flex items-center cursor-pointer text-white mb-4 gap-4 text-base hover:bg-black hover:rounded-lg transition-all duration-300 ease-in-out py-2 px-4">
              <span className='text-xl'><TfiDashboard/></span>
              <span className='text-base'>Dashboard</span>
            </Link>
            {/* <div onClick={handleUlasanTeknikal} className="flex items-center cursor-pointer text-white mb-4 gap-4 text-base hover:bg-black hover:rounded-lg transition-all duration-300 ease-in-out py-2 px-4">
              <span className='text-xl'><VscPreview/></span>
              <span className='text-base'>Ulasan Teknikal</span>
            </div> */}
          </div>

          {/* Logout Section */}
          <div className="mt-auto">
            <button className="bg-white text-black text-base py-2 px-4 rounded w-full flex items-center justify-center gap-4"
            onClick={handleLogout}>
              <span className='text-black '><IoIosLogOut/></span>
              Log Keluar
            </button>
          </div>
        </div>
      </div>
  )
}

export default SideNav