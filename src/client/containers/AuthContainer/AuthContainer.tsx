import { useEffect, useState } from 'react';
import { AuthContext } from '../../contexts';
import { getFingerprint, UserStatus } from '../../models';
import { ContainerProps } from '../type';

export const AuthContainer = ({ children }: ContainerProps) => {
  const [userId, setUserId] = useState('');
  const [userStatus, setUserStatus] = useState(UserStatus.NotLoggedIn);

  useEffect(() => {
    getFingerprint()
      .then(({ visitorId }) => {
        setUserId(visitorId);
        console.log(`Visitor: ${visitorId}`);
        return visitorId;
      })
      .then(visitorId => {
        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fingerprint: visitorId,
          }),
        })
          .then(res => res.json())
          .then(json => {
            if (json.message === 'OK') {
              setUserStatus(UserStatus.LoggedIn);
              console.log(`User login successfully`);
            }
          });
      })
      .catch(e => console.error(`User login failed`, e));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId,
        userStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
