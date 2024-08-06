import React from 'react'

interface Props {
    currentPage: number;
    totalPages: number;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    }

export const TablePaginate:React.FC<Props> = ({currentPage, totalPages, handlePreviousPage, handleNextPage}) => {
  return (
    <div className='flex justify-between mt-4'>
            <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50'
            >
                Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50'
            >
                Next
            </button>
        </div>
  )
}
