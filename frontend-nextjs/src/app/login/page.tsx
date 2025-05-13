'use client';
import { useMutation } from '@tanstack/react-query';
import { Button, Label, Modal, Spinner, TextInput } from 'flowbite-react';
import * as React from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import VerifyOtp from '~/components/verify-otp';
import { OtpService } from '~/services/otp.service';

type ILoginPageProps = {};

const LoginPage: React.FC<ILoginPageProps> = () => {
  const [email, setEmail] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await OtpService.send(email);
    },
    onSuccess() {
      setOpenModal(true);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 text-center">
          <HiOutlineMail className="mx-auto mb-2 h-12 w-12 text-gray-400" />
          <h3 className="text-xl font-medium text-gray-900">
            Enter your email
          </h3>
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Your email</Label>
          <TextInput
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button onClick={() => mutate()} className="w-full">
          {isPending && <Spinner size="sm" className="me-2" />}
          Send OTP
        </Button>
        {openModal && <VerifyOtp onClose={() => setOpenModal(false)} />}
      </div>
    </div>
  );
};

export default LoginPage;
