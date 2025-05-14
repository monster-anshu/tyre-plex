'use client';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import * as React from 'react';
import CreateOrder from '~/components/create-order';
import { orderQuery } from '~/queries/order.query';

type IOrdePageProps = {};

const OrdePage: React.FC<IOrdePageProps> = () => {
  const { data, isLoading } = useQuery(orderQuery);
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div className="overflow-x-auto p-4">
      {openModal && <CreateOrder onClose={() => setOpenModal(false)} />}
      <Button onClick={() => setOpenModal(true)} className="mb-4 ml-auto">
        Create Order
      </Button>
      {isLoading ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <Table striped>
          <TableHead>
            <TableRow>
              <TableHeadCell>Order Id</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>User Id</TableHeadCell>
              <TableHeadCell>Created At</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {data?.orders.map((order) => {
              return (
                <TableRow
                  key={order.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                    {order.id}
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default OrdePage;
