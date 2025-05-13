'use client';
import { useMutation } from '@tanstack/react-query';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  TextInput,
} from 'flowbite-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { OtpService } from '~/services/otp.service';

type IVerifyOtpProps = {
  onClose: () => void;
};

const VerifyOtp: React.FC<IVerifyOtpProps> = ({ onClose }) => {
  const [otp, setOtp] = React.useState('');
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await OtpService.verify(otp);
    },
    onSuccess() {
      router.push('/order');
    },
  });

  return (
    <Modal show onClose={onClose} size="md" popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal">
            Enter the OTP sent to your email
          </h3>
          <div className="mb-4">
            <TextInput
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <Button
            disabled={isPending}
            onClick={() => mutate()}
            className="w-full"
          >
            {isPending && <Spinner size="sm" className="me-2" />}
            Verify OTP
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default VerifyOtp;
