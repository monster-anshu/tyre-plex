import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  TextInput,
} from 'flowbite-react';
import * as React from 'react';
import { queryClient } from '~/providers/react-query';
import { orderQuery } from '~/queries/order.query';
import { OrderService } from '~/services/order.service';

type ICreateOrderProps = {
  onClose: () => void;
};

const CreateOrder: React.FC<ICreateOrderProps> = ({ onClose }) => {
  const [amount, setAmount] = React.useState('');
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      const a = +amount;
      if (a < 1) {
        throw new Error('Amount should be >= 1');
      }
      const order = await OrderService.create(a);
      return order;
    },
    onSuccess(order) {
      queryClient.setQueryData(orderQuery.queryKey, (curr) => {
        const orders = curr?.orders || [];
        return {
          ...curr,
          isSuccess: curr?.isSuccess ?? true,
          orders: orders.concat(order),
        };
      });
      onClose();
    },
  });
  return (
    <Modal show size="md" popup onClose={onClose}>
      <ModalHeader />
      <ModalBody>
        <Label>Enter order amount</Label>
        <TextInput
          type="number"
          inputMode="numeric"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="26.00"
        />
        <Button
          className="mt-4 w-full"
          disabled={isPending}
          onClick={() => mutate()}
        >
          {isPending && <Spinner size="sm" className="me-2" />}
          Create
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default CreateOrder;
