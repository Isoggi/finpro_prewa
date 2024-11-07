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
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const MySwal = withReactContent(Swal);

const VerifyEmail = () => {
  const router = useRouter();
  const query = useSearchParams();
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResendEmail = () => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6f2fe]">
      <div className="p-8 rounded-lg shadow-lg text-center max-w-4xl w-full border bg-white border-white sm:mx-4 flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-2/3 mb-6 sm:mb-0 sm:mr-4 flex justify-center">
          <img
            src="/resetpw.png"
            alt="Email Verification Illustration"
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-2/3 text-left">
          <p className="text-black text-base flex mx-auto font-bold mb-10">
            Konfirmasi Password
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 relative">
              <input
                className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                disabled={isVerified}
              />
              <button
                type="button"
                className="absolute right-3  top-4 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isVerified}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="password" />
              </div>
            </div>

            <div className="mb-4 relative">
              <input
                className="w-full p-3 border border-black rounded-lg text-black bg-transparent placeholder-gray-300"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                {...register('confirm_password')}
                disabled={isVerified}
              />
              <button
                type="button"
                className="absolute right-3  top-4 text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                disabled={isVerified}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="text-red-500 text-sm mt-1">
                <ErrorMessage errors={errors} name="confirm_password" />
              </div>
            </div>

            <button
              className="w-full py-2 px-4 bg-[#e6f2fe] text-black rounded-xl transition disabled:bg-[#128ede] disabled:text-white disabled:cursor-not-allowed"
              type="submit"
              disabled={form.formState.isSubmitting || isVerified}
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6f2fe]">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verifikasi email Anda
        </h1>
        <p className="text-center text-gray-600 mt-4">
          Kami telah mengirimkan email verifikasi ke email Anda yang terdaftar.
          Jika belum ada silahkan kirim ulang.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            className={`btn ${emailSent ? 'btn-disabled' : 'btn bg-[#e6f2fe]'}`}
            onClick={handleResendEmail}
            disabled={emailSent}
          >
            {emailSent ? 'Email sent!' : 'Kirim ulang'}
          </button>
        </div>
        {emailSent && (
          <p className="text-green-500 text-center mt-4">
            Email verifikasi dikirim ulang! Tunggu 60 detik untuk mengirim ulang
            lagi.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
