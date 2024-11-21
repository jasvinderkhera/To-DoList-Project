import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import AuthScreen from '../authScreen/authScreen';
import Home from '../home/home';

export default function MainPage() {
  const [user, setUser] = useState(null);

  useEffect( () => {
    const unsubscribe =  auth.onAuthStateChanged( (user) => {
       setUser(user);
    });
    return unsubscribe;
  }, []);


  return (
    <div>
      {user!==null ? (
        <>
          <Home />
        </>
      ) : (
        <AuthScreen onAuthSuccess={() => setUser(auth.currentUser)} />
      )}
    </div>
  );
}