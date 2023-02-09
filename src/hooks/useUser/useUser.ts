import { useFirebaseAuth, useFirestore } from "hooks/useFirebase/useFirebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";

type User = {
  author: string;
  id: string;
};

export const useUser = () => {
  const firestore = useFirestore();
  const [authUser, authLoading, authError] = useAuthState(useFirebaseAuth());

  const [user, loading, error] = useDocumentData(
    authUser?.uid ? doc(firestore, "users", authUser?.uid) : null,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return {
    user: user as User,
    loading,
    error,
    authUser,
    authLoading,
    authError,
  };
};
