'use client'

import { useState } from 'react'

const useTab = () => {
    const [activeTab, setActiveTab] = useState<number>(0)

    const handleTabClick = (index: number) => {
        setActiveTab(index)
        console.log('Tab clicked', index)
    }

    return {activeTab, handleTabClick}
}

export default useTab;