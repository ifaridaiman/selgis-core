import { useState } from 'react';

interface UlasanItem {
  ulasan: string;
  folder: string;
}

const useUlasanStorage = (key: string) => {

  const [ulasanItems, setUlasanItems] = useState<UlasanItem[]>(() => {
    if (typeof window === 'undefined') {
      localStorage.setItem(key, JSON.stringify([]));
    }
    const savedItems = localStorage.getItem(key);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const addUlasan = (ulasan: string, folder: string) => {
    const newItem = { ulasan, folder };
    const updatedItems = [...ulasanItems, newItem];
    setUlasanItems(updatedItems);
    localStorage.setItem(key, JSON.stringify(updatedItems));
  };

  return {
    ulasanItems,
    addUlasan,
  };
};

export default useUlasanStorage;
