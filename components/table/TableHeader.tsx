import React from 'react'

export const TableHeader = () => {
  return (
    <thead>
        <tr>
            <th className='py-4 px-4 bg-gray-300 text-left rounded-tl-xl'>Nama Pemaju</th>
            <th className='py-4 px-4 bg-gray-300'>No. Pendaftaran</th>
            <th className='py-4 px-4 bg-gray-300'>Kawasan</th>
            <th className='py-4 px-4 bg-gray-300'>Mukim</th>
            <th className='py-4 px-4 bg-gray-300'>Daerah</th>
            <th className='py-4 px-4 bg-gray-300 rounded-tr-xl'>Action</th>
        </tr>
    </thead>
  )
}
