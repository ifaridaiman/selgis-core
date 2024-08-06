import React from 'react'

interface Props {
    children: React.ReactNode;
}

export const Table:React.FC<Props> = ({children}) => {
  return (
    <table className='w-full'>
        {children}
    </table>
  )
}
