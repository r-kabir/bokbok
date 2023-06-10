// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmyq_Z-l3UvJkU82OBxzeC4rR9a5VL5pE",
  authDomain: "bokbok-9c12d.firebaseapp.com",
  projectId: "bokbok-9c12d",
  storageBucket: "bokbok-9c12d.appspot.com",
  messagingSenderId: "150428622398",
  appId: "1:150428622398:web:a7459e3bb8021056c07b6f",
  measurementId: "G-2Y8YDKVDS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseConfig;