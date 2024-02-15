import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  FB_MESSAGING_SENDER_ID,
  FB_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: FB_API_KEY,
  authDomain: FB_AUTH_DOMAIN,
  projectId: FB_PROJECT_ID,
  storageBucket: FB_STORAGE_BUCKET,
  messagingSenderId: FB_MESSAGING_SENDER_ID,
  appId: FB_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
export const dataRef = firebase.database();
export const storage = firebase.storage().ref();
AppRegistry.registerComponent(appName, () => App);
export default firebase;
