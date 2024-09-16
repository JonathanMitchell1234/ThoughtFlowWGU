// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCT1LCcHvYDsgtyHkg4S-YMRI-OoDANjco",
	authDomain: "journal-bb1dd.firebaseapp.com",
	projectId: "journal-bb1dd",
	storageBucket: "journal-bb1dd.appspot.com",
	messagingSenderId: "85603688604",
	appId: "1:85603688604:web:7483154a434c92ceaa0d59",
	measurementId: "G-KWPPW8DHEZ",
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
