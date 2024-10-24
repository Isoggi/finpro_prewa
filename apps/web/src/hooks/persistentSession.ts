import { useSession } from 'next-auth/react';
import React from 'react';

export const usePersistedUserSession = () => {
  const { data: session, status } = useSession();
  const [userSession, setUserSession] = React.useState(session);

  // Update the state when the session changes (only on first load or session change)
  React.useEffect(() => {
    if (session && status === 'authenticated') {
      setUserSession(session);
    }
  }, [session, status]);

  return {
    user: userSession?.user,
    status,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  };
};
