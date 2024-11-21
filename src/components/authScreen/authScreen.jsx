// src/components/AuthScreen.js
import React, { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import './authScreen.css'
import { images } from '../../constants/ImagePath';

export default function AuthScreen({ onAuthSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');
  const [screen, setScreen] = useState('login')

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('Password reset email sent! Check your inbox.');
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='loginPage h-screen flex flex-col justify-center items-center'>
    { screen === "login" ?  <div className=" glassScreen px-10 py-16 rounded-xl flex flex-col">
      <div className='flex justify-center'><img src={images.logo} alt=""  className=' mb-4 h-20 w-24 rounded-2xl text-center logoImage'/></div>
      <div className="text-3xl text-center text-white">TaskHive</div>
      <div className='my-4 text-xl text-center'>Organise your Daily Routine</div>
     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className='h-12 w-96 px-4 rounded-full mb-8 loginInput'/>
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className='h-12 w-96 px-4 rounded-full mb-5 loginInput'/>

      <div className="forgotBtn mb-3 text-right cursor-pointer">
        <h4 onClick={()=>setScreen("forgot")}>Forgot Password?</h4>
      </div>
      <button onClick={handleAuth} className='loginButton h-14 bg-blue-600 text-xl text-white rounded-full mb-3'>{isRegistering ? 'Register' : 'Login'}</button>
      <p onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? <h3 className='mt-4 text-center text-white text-l cursor-pointer'>Already have an account? Login</h3> : <h3 className='mt-4 text-center text-white text-l cursor-pointer'>Don't have an account? Register</h3>}
      </p>
  
     </div> : 
       <div>
        <div className=" glassScreen px-10 py-16 rounded-xl flex flex-col">
        <div className='flex justify-center'><img src={images.logo} alt=""  className=' mb-4 h-20 w-24 rounded-2xl text-center logoImage'/></div>
      <div className="text-3xl text-center text-white appName">TaskHive</div>
       <h3 className='text-xl my-4 '>Enter Email</h3>
       <input
         type="email"
         placeholder="Enter your email"
         value={resetEmail}
         onChange={(e) => setResetEmail(e.target.value)}
         className='h-12 w-96 px-4 rounded-full mb-8 loginInput'
       />
       <button onClick={handleForgotPassword} className='loginButton h-14 bg-blue-600 text-xl text-white rounded-full mb-3'>Reset Password</button>
       <div className="forgotBtn mb-3 text-center cursor-pointer">
        <h4 onClick={()=>setScreen("login")} className='text-white text-l'>Already have an Account? Login</h4>
      </div>
     </div>
     </div>
}
    </div>
  );
}
