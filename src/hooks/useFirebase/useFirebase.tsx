import { getAuth } from "firebase/auth";
import { getApp } from "../../firebase";
import { getFirestore } from "firebase/firestore";

export const useFirebaseApp = () => {
  return getApp();
};

export const useFirebaseAuth = () => {
  return getAuth(useFirebaseApp());
};

export const useFirestore = () => {
  return getFirestore(useFirebaseApp());
};
