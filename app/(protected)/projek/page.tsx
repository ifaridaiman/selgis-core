import React from 'react'
import Link from 'next/link'
import { DragAndDrop } from '@/components/form/draganddrop'
const ProjectPage = () => {
  return (
    <>
        <div className=' mb-6 flex justify-between items-center'>
            <h2 className='text-black font-bold text-2xl'>Daftar Projek Baharu</h2>
            <Link href='/pengguna/berdaftar' className='bg-blue-500 text-white py-2 px-4 rounded-md'>Kembali</Link>
        </div>
        <div className='bg-white p-7 rounded-lg'>
            <div className=' w-96 mx-auto'>
                <div className='mb-4'>
                    <label className='block mb-2'>No. Rujukan</label>
                    <input type='text' className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Nama Pemaju</label>
                    <input type='text' className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Kawasan</label>
                    <input type='text' className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Mukim</label>
                    <input type='text' className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Daerah</label>
                    <input type='text' className='border border-gray-300 rounded-md px-4 py-2 w-full' />
                </div>
                <div className='mb-4'>
                    <label className='block mb-2'>Lampiran</label>
                    {/* <input type='file' className='border border-gray-300 rounded-md px-4 py-2 w-full' /> */}
                    <DragAndDrop />
                </div>
                <div className='mb-4'>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-md w-full'>Daftar Projek</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectPage