import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "./favourites.css";

function Favourites() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const tasksQuery = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(tasksData);

      let favouriteTask = []
      tasksData.map((item)=>{
        if (item.favorite === true) {
            favouriteTask.push(item);
        }
    })

    
      setTasks(favouriteTask);
    });

    return unsubscribe;
  }, []);

  const toggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  return (
    <div>
       <div className="text-3xl text-blue-800 ps-3">Favourites</div>
      <div className="taskItems py-4 px-12">
        {tasks.map((task) => (
          <div
            className="taskItem flex justify-start items-center gap-6 mb-5"
            key={task.id}
          >
            <div
              onClick={() => toggleComplete(task)}
              className="check h-10 w-10 rounded-full bg-white border-blue-800 border-4 flex justify-center items-center"
            >
              <div
                style={{ display: task.completed ? "block" : "none" }}
                className="bg-green-500 h-6 w-6 rounded-full"
              ></div>
            </div>
            <div
              className="taskDetail p-4 bg-white"
            >
             <h2  style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}>{task.description}</h2>
             <button onClick={() => deleteTask(task.id)} style={{display: task.completed ? "block" : 'none'}} className="mt-3 px-6 py-2 bg-red-600 rounded-2xl">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favourites;
