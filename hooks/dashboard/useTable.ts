'use client'
import { useState } from "react";

export const useTable = () => {
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    // Pagination State
    const [currentPage, setCurrentPage] = useState<number>(1);
    
    const handleRowSelect = (index: number) => {
        setSelectedRows((prev) => {
            if (prev.includes(index)) {
                return prev.filter((item) => item !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const handleSelectAll = (rows: any[], isChecked: boolean) => {
        if (isChecked) {
            const allIndexes = rows.map((_, index) => index);
            setSelectedRows(allIndexes);
        } else {
            setSelectedRows([]);
        }
    };

    const handlePaginatedData = (data: any[], page: number, pageSize = 10) => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const paginatedData = data.slice(startIndex, endIndex);
        
        return {
            data: paginatedData,
            currentPage: page,
            totalPages: Math.ceil(data.length / pageSize),
            totalItems: data.length,
            message: "Success",
            error: null
        };
    };


  return { handleRowSelect, handlePaginatedData, handleSelectAll, selectedRows };
};