import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCDMRJBQzppZdIb8VzkUwPnUXHHMJ2mEzE",
	authDomain: "learn-quran-interactively.firebaseapp.com",
	projectId: "learn-quran-interactively",
	storageBucket: "learn-quran-interactively.appspot.com",
	messagingSenderId: "16810710778",
	appId: "1:16810710778:web:17c4edb0a549153adfdb43",
	measurementId: "G-M344C3JRFE",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
