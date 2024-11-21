import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized instances
export const auth = getAuth(app);
export const db = getFirestore(app);





const user = auth.currentUser;

if (user) {
  const username = user.displayName;
  const email = user.email;
  console.log("Username:", username);
  console.log("Email:", email);
} else {
  console.log("No user is signed in.");
}





// authDomain: "todoapp-4a5ce.firebaseapp.com",
// projectId: "todoapp-4a5ce",
// storageBucket: "todoapp-4a5ce.firebasestorage.app",
// messagingSenderId: "605183708766",
// appId: "1:605183708766:web:1e179ef4ac5365a24faecf"
// };