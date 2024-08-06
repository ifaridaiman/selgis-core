import React from 'react'
import { IoDocumentAttachOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';

interface Props {
  data: any;
  openModalAttachment: (namaPemaju:string) => void;
}


export const TableData:React.FC<Props> = ({data, openModalAttachment}) => {
    return (
      <table className='w-full'>
      <thead className=''>
          <tr >
              <th className='py-4 px-4 bg-gray-300 text-left rounded-tl-xl'>Nama Pemaju</th>
              <th className='py-4 px-4 bg-gray-300 '>No. Pendaftaran</th>
              <th className='py-4 px-4 bg-gray-300 '>Kawasan</th>
              <th className='py-4 px-4 bg-gray-300 '>Mukim</th>
              <th className='py-4 px-4 bg-gray-300 '>Daerah</th>
              <th className='py-4 px-4 bg-gray-300 rounded-tr-xl'>Action</th>
          </tr>
      </thead>
      <tbody>
          {data.map((item:any, index:number) => (
              <tr key={index} className='border-b border-gray-300 odd:bg-white even:bg-gray-100'>
                  <td className='py-4 px-4 '>{item.namaPemaju}</td>
                  <td className='py-4 px-4 text-center '>{item.noPendaftaran}</td>
                  <td className='py-4 px-4 text-center '>{item.kawasan}</td>
                  <td className='py-4 px-4 text-center '>{item.mukim}</td>
                  <td className='py-4 px-4 text-center '>{item.daerah}</td>
                  <td className='py-4 px-4 text-center '>
                      <div className='flex items-center text-xl justify-center'>
                          <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' title='Delete Item'>
                              <IoTrashBinOutline/>
                          </button>
                          <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' title='Update Item'>
                              <IoPencilOutline/>
                          </button>
                          <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' onClick={() => openModalAttachment(item.namaPemaju)} title='Project File Attachment'>
                              <IoDocumentAttachOutline/>
                          </button>
                      </div>
                  </td>
              </tr>
          ))}
      </tbody>
  </table>
  )
}
