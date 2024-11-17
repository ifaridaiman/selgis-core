'use client'
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token cookie
    removeCookie('token');

    // Optionally, clear other cookies or user-related state here

    // Redirect to the login or home page
    router.push('/login');
  };

  return { handleLogout };
};
