'use client'

import { useRef, useState } from "react"

export const DragAndDrop = () => {
    
        const [dragging, setDragging] = useState<boolean>(false);
        const dragCounter = useRef<number>(0);
    
        const handleDrag = (e:React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
        };
    
        const handleDragIn = (e:React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounter.current++;
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                setDragging(true);
            }
        };
    
        const handleDragOut = (e:React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            dragCounter.current--;
            if (dragCounter.current === 0) {
                setDragging(false);
            }
        };
    
        const handleDrop = (e:React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                console.log(e.dataTransfer.files);
                e.dataTransfer.clearData();
                dragCounter.current = 0;
            }
        };
    
        return (
            <div
                onDrop={handleDrop}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                className={`drag-drop ${dragging ? 'dragging' : ''}`}
            >
                <div className='drop-area bg-gray-100 p-8 text-center'>
                    <h1>Drag & Drop files here</h1>
                </div>
            </div>
        )
    }