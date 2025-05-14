import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { userQuery } from '~/queries/user.query';

type IAuthProviderProps = {
  children: React.ReactNode;
};
const unprotected_routes = ['/login'];

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const pathname = usePathname();
  const { data, isLoading } = useQuery({
    ...userQuery,
    enabled: !unprotected_routes.includes(pathname),
  });

  if (isLoading) {
    return <Spinner />;
  }

  return children;
};

export default AuthProvider;
