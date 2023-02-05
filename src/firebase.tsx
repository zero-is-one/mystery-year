import { initializeApp, getApps } from "firebase/app";

const firebaseConfig: any = {
  apiKey: "AIzaSyCv7A0cn7Ov4ExfCS85EzhfuzFPlFYRDEw",
  authDomain: "mystery-year.firebaseapp.com",
  projectId: "mystery-year",
  storageBucket: "mystery-year.appspot.com",
  messagingSenderId: "726866008213",
  appId: "1:726866008213:web:08a6223d7c541645a8239c",
  measurementId: "G-4J3TR02FMY",
};

// Enable Real Time Database emulator if environment variable is set
// if (process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST) {
//   firebaseConfig.databaseURL = `http://${process.env.REACT_APP_FIREBASE_DATABASE_EMULATOR_HOST}?ns=${firebaseConfig.projectId}`;
//   console.debug(`RTDB emulator enabled: ${firebaseConfig.databaseURL}`); // eslint-disable-line no-console
// }
export const getApp = () => {
  if (getApps().length < 1) return initializeApp(firebaseConfig);
  return getApps()[0];
};

export const app = getApp();
