import { useState } from "react";

export const useDashboard = () => {

    const handleChangeDaerah = () =>{
        console.log("Daerah changed");
    }

    return { handleChangeDaerah };
}