'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
    mutations: {
      onError(error) {
        alert(error.message);
      },
    },
  },
});

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
