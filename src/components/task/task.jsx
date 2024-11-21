import React, { useState, useEffect } from "react";
import "./task.css";
import { images } from "../../constants/ImagePath";
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

function Task() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingText, setEditingText] = useState("");

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
      // console.log("tasks", tasksData);
      setTasks(tasksData);
    });

    return unsubscribe;
  }, []);

  const toggleFavorite = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { favorite: !task.favorite });
  };

  const toggleComplete = async (task) => {
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { completed: !task.completed });
  };

  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingText(task.description);
  };

  const saveEdit = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, { description: editingText });
    setEditingTaskId(null);
    setEditingText("");
  };

  return (
    <div>
      <div className="tasks h-full w-full">
        <div className="text-3xl text-blue-800 ps-3">Tasks</div>

        <div className="taskItems py-4 px-12">
          {tasks.map((task) => (
            <div
              className="taskItem flex justify-start items-center gap-6 mb-5"
              key={task.id}
            >
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="px-3 h-11 w-96 text-xl rounded-2xl"
                  />
                <div className="editBtns">
                <button
                    onClick={() => saveEdit(task.id)}
                    className=" px-6 py-2 bg-green-500 rounded-2xl"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingTaskId(null)}
                    className=" px-6 py-2 bg-gray-500 rounded-2xl"
                  >
                    Cancel
                  </button>
                </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => toggleComplete(task)}
                    className="check h-10 w-10 rounded-full bg-white border-blue-800 border-4 flex justify-center items-center"
                  >
                    <div
                      style={{ display: task.completed ? "block" : "none" }}
                      className="innerCheck bg-green-500 h-6 w-6 rounded-full"
                    ></div>
                  </div>
                  <div className="taskDetail p-4 bg-white">
                    <h2
                      style={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                        cursor: "pointer",
                      }}
                    >
                      {task.description}
                    </h2>
                    <h6 className="flex justify-end text-sm">
                      {task.createdAt.toDate
                        ? task.createdAt.toDate().toLocaleString() // For Firebase Timestamp
                        : new Date(
                            task.createdAt.seconds * 1000 +
                              task.createdAt.nanoseconds / 1000000
                          ).toLocaleString()}
                    </h6>
                    <button
                      onClick={() => deleteTask(task.id)}
                      style={{ display: task.completed ? "block" : "none" }}
                      className="mt-3 px-6 py-2 bg-red-600 rounded-2xl"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="mobActions">
                    <img
                      onClick={() => toggleFavorite(task)}
                      src={task.favorite ? images.heart : images.unfavourite}
                      className="favourite"
                      alt=""
                    />
                    <img src={images.edit} alt="" className="mob_edit h-6 mt-2 w-6"  onClick={() => startEditing(task)}/>
                  </div>
                  <button
                    onClick={() => startEditing(task)}
                    className="edit px-6 py-2 rounded-2xl"
                  >
                    <img src={images.edit} alt="" className="h-8 w-8" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Task;
