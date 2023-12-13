import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBP7gbXWtyQtIfnAQSxcG7BIFfj6OAXnhI",
  authDomain: "crmbromag.firebaseapp.com",
  projectId: "crmbromag",
  storageBucket: "crmbromag.appspot.com",
  messagingSenderId: "299076789742",
  appId: "1:299076789742:web:ae0ce3b2ea8158434a1aff",
  measurementId: "G-MFZFJ9V0VW"
};
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);