import React, { useState } from 'react'
import './newTask.css'
import { db, auth } from '../../firebase/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function NewTask() {
    const [newTask, setNewTask] = useState('');

    const addTask = async () => {
        if (newTask.trim()) {
          await addDoc(collection(db, 'tasks'), {
            description: newTask,
            createdAt: new Date(),
            completed: false,
            userId: auth.currentUser.uid,
          });
          setNewTask('');
        }
      };
  return (
    <div className='newTask flex justify-start items-between flex-col ms-56'>
        <h3 className='text-2xl mb-3 ms-24'>New Task</h3>
        <input type="text" className='px-3 h-11 w-96 text-xl rounded-2xl' value={newTask} onChange={(e)=>setNewTask(e.target.value)} />
        <button onClick={addTask} className='w-52 py-3 bg-blue-800 my-5 text-xl ms-16 text-white rounded-3xl'>Add Task</button>
    </div>
  )
}

export default NewTask