import {useRouter} from 'next/navigation';

export const useNav = () => {
    const router = useRouter();
  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const handleUlasanTeknikal = () => {
    router.push('/ulasan-teknikal');
  };

  return { handleDashboard, handleUlasanTeknikal };
};