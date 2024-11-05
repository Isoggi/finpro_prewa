'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/config/axios.config';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { verifyForgetPasswordSchema } from '@/schemas/auth.schema';
import { actionConfirmVerifyPassword } from '@/action/auth.action';

const MySwal = withReactContent(Swal);

const VerifyEmail = () => {
  const router = useRouter();
  const query = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleResendEmail = () => {
    // Simulate API call for resending email
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 60000);
  };

  const email = query.get('email');
  const token = query.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (emailSent && email && !isVerified) {
        try {
          await api.patch(`/auth/verify-password`, { email });
          setIsVerified(true);
        } catch (error) {
          console.error('send failed:', error);
        }
      }
    };

    verifyEmail();
  }, [emailSent]);

  const form = useForm<z.infer<typeof verifyForgetPasswordSchema>>({
    resolver: zodResolver(verifyForgetPasswordSchema),
    defaultValues: {},
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  const onSubmit = async (
    values: z.infer<typeof verifyForgetPasswordSchema>,
  ) => {
    if (isVerified) return;
    try {
      const res = await actionConfirmVerifyPassword(
        token as string,
        values.password,
      );
      form.reset();
      router.push('/masuk');

      Toast.fire({
        icon: 'success',
        title: res.message || 'Verification Successful',
      });
      setIsVerified(true);
    } catch (err) {
      if (err instanceof Error) {
        Toast.fire({
          icon: 'error',
          title: `Verification failed: ${err.message}`,
        });
      }
    }
  };

  return token ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6f2fe] ">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
              type="password"
              placeholder="Password"
              {...register('password')}
              disabled={isVerified}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="password" />
            </div>
          </div>

          <div className="mb-4">
            <input
              className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
              type="password"
              placeholder="Confirm Password"
              {...register('confirm_password')}
              disabled={isVerified}
            />
            <div className="text-red-500 text-sm mt-1">
              <ErrorMessage errors={errors} name="confirm_password" />
            </div>
          </div>

          <button
            className="w-full py-2 px-4 bg-[#e6f2fe] text-black rounded-xl  transition disabled:bg-[#128ede] disabled:text-white disabled:cursor-not-allowed"
            type="submit"
            disabled={form.formState.isSubmitting || isVerified}
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6f2fe]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verify your email
        </h1>
        <p className="text-center text-gray-600 mt-4">
          We've sent a verification email to your registered address.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            className={`btn ${emailSent ? 'btn-disabled' : 'btn bg-[#e6f2fe]'}`}
            onClick={handleResendEmail}
            disabled={emailSent}
          >
            {emailSent ? 'Email sent!' : 'Resend'}
          </button>
        </div>
        {emailSent && (
          <p className="text-green-500 text-center mt-4">
            Verification email resent! Wait 60 seconds to resend again.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
