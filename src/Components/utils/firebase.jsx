
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBdfVNRdAqzWD3G0gWbrX0CkQB2Z8NHaKc",
  authDomain: "game-store-dd0a5.firebaseapp.com",
  databaseURL: "https://game-store-dd0a5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "game-store-dd0a5",
  storageBucket: "game-store-dd0a5.appspot.com",
  messagingSenderId: "193826764704",
  appId: "1:193826764704:web:057ec1470921335fc316c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);
export const auth = getAuth(app);
// export const firestore = app.firestore();