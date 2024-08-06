import { ApiResponseType } from "@/types/common/api.type";

const PAGE_SIZE = 10;

export const getPaginatedData = (data: any[], page: number, pageSize = PAGE_SIZE) => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
        data: paginatedData,
        currentPage: page,
        totalPages: Math.ceil(data.length / pageSize),
        totalItems: data.length,
        message: "Success",
        error: null
    };
}