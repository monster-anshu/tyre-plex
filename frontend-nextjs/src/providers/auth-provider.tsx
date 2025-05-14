'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { client } from '~/services/client';

type IAuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const router = useRouter();

  React.useEffect(() => {
    client.interceptors.response.use(undefined, async (error) => {
      if (axios.isAxiosError(error)) {
        const status = error.status;
        if (status === 401) {
          router.push('/login');
        }
      }
    });
  }, []);

  return children;
};

export default AuthProvider;
