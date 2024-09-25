'use client';

import useTab from '@/components/tab/hooks/useTab';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export const useNav = () => {
  const router = useRouter();
  const path = usePathname();
  const { handleTabClick } = useTab();

  const handleAfterNavigationUlasanTeknikal = useCallback(() => {
    const tabId = document.getElementById('tab-container');
    if (tabId) {
      // tabId.scrollIntoView({ behavior: 'smooth' });
      tabId.addEventListener('scrollend', () => {
        handleTabClick(1);
      }, { once: true });
    }else{
      handleTabClick(1);
    }
  }, [handleTabClick]);

  const handleUlasanTeknikal = useCallback(() => {
    if (path !== '/halaman-utama') {
      router.push('/halaman-utama');
    } else {
      handleAfterNavigationUlasanTeknikal();
    }
  }, [path, router, handleAfterNavigationUlasanTeknikal]);

  useEffect(() => {
    if (path === '/halaman-utama') {
      handleAfterNavigationUlasanTeknikal();
    }
  }, [path, handleAfterNavigationUlasanTeknikal]);

  const handleDashboard = () => {
    router.push('/halaman-utama');
  };

  const handleSampleDocument = () => {
    router.push('/ulasan-teknikal/project-permatang-pauh');
  }

  return { handleDashboard, handleUlasanTeknikal,handleSampleDocument };
};
