import React from 'react'
import { IoTrashBinOutline, IoPencilOutline, IoDocumentAttachOutline } from 'react-icons/io5';

interface Props {
    item: any;
    openModalAttachment: (namaPemaju:string) => void;
}

const TableRow:React.FC<Props> = ({item,openModalAttachment}) => {
  return (
    <tr className='border-b border-gray-300 odd:bg-white even:bg-gray-100'>
            <td className='py-4 px-4'>{item.namaPemaju}</td>
            <td className='py-4 px-4 text-center'>{item.noPendaftaran}</td>
            <td className='py-4 px-4 text-center'>{item.kawasan}</td>
            <td className='py-4 px-4 text-center'>{item.mukim}</td>
            <td className='py-4 px-4 text-center'>{item.daerah}</td>
            <td className='py-4 px-4 text-center'>
                <div className='flex items-center text-xl justify-center'>
                    <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' title='Delete Item'>
                        <IoTrashBinOutline />
                    </button>
                    <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' title='Update Item'>
                        <IoPencilOutline />
                    </button>
                    <button className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full' onClick={() => openModalAttachment(item.namaPemaju)} title='Project File Attachment'>
                        <IoDocumentAttachOutline />
                    </button>
                </div>
            </td>
        </tr>
  )
}

export default TableRow