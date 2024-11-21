import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase/firebase';
import { UsernameContext } from '../../context/context';
import "./setting.css"


export default function Setting() {
  const [user, setUser] = useState(null);
  const [name,setName] = useState('')
    const {setUsername} = useContext(UsernameContext)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className='settings flex flex-col justify-center items-center h-full me-48'>
      {process.env.PORT}
        <div className="usernameChange my-24">
            <input type="text" min={3} max={10} value={name} onChange={(e)=>{setName(e.target.value)}} className='border-2 border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-96' />
            {console.log(name)}
            <br />
            <button className='px-5 py-2 text-2xl my-5 ms-20 bg-blue-400 rounded-2xl text-white' onClick={()=>{setUsername(name);setName('')}}>Update Username</button>
        </div>
      
          <button onClick={handleLogout} className='px-8 py-4 rounded-2xl bg-blue-700 text-xl text-white '>Logout</button>
        
    </div>
  );
}




{/* <div>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <Home />
        </>
      ) : (
        <AuthScreen onAuthSuccess={() => setUser(auth.currentUser)} />
      )}
    </div> */}
