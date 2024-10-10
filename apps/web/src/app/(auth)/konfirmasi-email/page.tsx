import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/config/axios.config';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          await api.get(`/confirm-verify-password/${token}`);
          alert('Email verified successfully! You can now log in.');
          router.push('/masuk');
        } catch (error) {
          console.error('Verification failed:', error);
          alert('Verification failed. Please try again.');
        }
      }
    };

    verifyEmail();
  }, [token]);

  return <div>Verifying your email, please wait...</div>;
};

export default VerifyEmail;
