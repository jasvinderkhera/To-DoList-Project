import React, { useEffect, useState } from 'react';
import { db, auth } from '../../firebase/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import './search.css'


function Search() {
    const [tasks, setTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
  
    useEffect(() => {
      const tasksQuery = query(
        collection(db, 'tasks'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );
  
      const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksData);
      });
  
      return unsubscribe;
    }, []);
  
    useEffect(() => {
      // Filter tasks based on search query
      const filtered = tasks.filter((task) =>
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }, [searchQuery, tasks]);
  
  return (
    <div className='searchContainer'>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className='searchBox h-16 w-3/5 px-8 mx-12 rounded-full'
      />
      <ul className='px-16 my-12 text-xl'>
        {filteredTasks.map((task) => (
          <li key={task.id} className='mb-3 px-8 w-3/4 py-5 bg-white list-disc '>
            <span>{task.description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search

