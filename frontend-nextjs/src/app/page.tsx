'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { userQuery } from '~/queries/user.query';

export default function Home() {
  const { data, isLoading, error } = useQuery(userQuery);
  const router = useRouter();

  useEffect(() => {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        router.push('/login');
      }
    }
    if (data?.id) {
      router.push('/order');
    }
  }, [error, data]);

  if (isLoading) {
    return (
      <div className="my-2 text-center">
        <Spinner size="sm" />
      </div>
    );
  }

  return null;
}
