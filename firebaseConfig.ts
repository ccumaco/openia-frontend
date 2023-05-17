import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAM-S6AjbJR0GRPwLCohQvp-2dY6RXK4FA",
  authDomain: "arquitext-e5531.firebaseapp.com",
  projectId: "arquitext-e5531",
  storageBucket: "arquitext-e5531.appspot.com",
  messagingSenderId: "460068454279",
  appId: "1:460068454279:web:f9caf1a205dc845832dd22"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

export { auth, db, storage };
