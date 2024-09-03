import Image from 'next/image'
import React from 'react'
import { LuFileEdit } from "react-icons/lu";

const UlasanContainer = () => {
  return (
    <div className='w-full h-full flex flex-col'>
        <div className='w-full h-full'>
            {/* if no data */}
            <div className='flex flex-col justify-center items-center py-16'>
                <Image src="assets/icons/noData.svg" width={50} height={50} alt="No Data" />
                <p>Tiada Data Ulasan</p>
            </div>
        </div>
        <hr/>
        <div className='py-4'>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col w-3/4'>
                    <input type='text' placeholder='Tulis Ulasan' className='border border-gray-300 rounded-t-md px-4 py-2 w-full bg-gray-100 focus:bg-gray-50 placeholder-gray-600'/>
                    <input type='file' className='border border-gray-300 rounded-b-md px-4 py-2 w-full'/>
                </div>
                <div className=''>
                    <button className='bg-blue-600 py-2 px-3 flex gap-2 rounded-md text-blue-100 justify-center items-center'><span><LuFileEdit /></span>{'Tambah Ulasan'}</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default UlasanContainer