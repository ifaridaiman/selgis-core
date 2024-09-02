import { ChangeEventHandler, useState } from "react";

export const useDashboard = () => {

    const handleChangeDaerah = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        console.log("Daerah changed", event.target.value);
    }

    return { handleChangeDaerah };
}