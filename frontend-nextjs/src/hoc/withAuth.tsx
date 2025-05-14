import { useQuery } from '@tanstack/react-query';
import { Spinner } from 'flowbite-react';
import * as React from 'react';
import { userQuery } from '~/queries/user.query';

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  return function AuthoriedComponent(props: T) {
    const { isLoading } = useQuery(userQuery);

    if (isLoading) {
      return (
        <div className="my-2 text-center">
          <Spinner size="sm" />
        </div>
      );
    }

    return (
      <WrappedComponent {...(props as T & React.JSX.IntrinsicAttributes)} />
    );
  };
}
