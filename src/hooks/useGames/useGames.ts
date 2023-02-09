import { useFirestore } from "hooks/useFirebase/useFirebase";
import {
  doc,
  collection,
  getDoc,
  addDoc,
  getCountFromServer,
  query,
  orderBy,
  endAt,
  limit,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useUser } from "hooks/useUser/useUser";

export const useGames = () => {
  const firestore = useFirestore();
  const { authUser } = useUser();
  const navigate = useNavigate();

  async function start() {
    const photos = await Promise.all([
      getRandomPhoto(),
      getRandomPhoto(),
      getRandomPhoto(),
      getRandomPhoto(),
      getRandomPhoto(),
    ]);

    console.log(authUser?.uid);

    const snapshot = await addDoc(collection(firestore, "games"), {
      photos,
      userId: authUser?.uid,
      createdAt: Timestamp.now(),
    });

    navigate(`/game/${snapshot.id}`);
  }

  async function getRandomPhoto() {
    const photosRef = collection(firestore, "photos");
    const randomId = doc(collection(firestore, "random")).id;

    const q = query(
      photosRef,
      orderBy("__name__"),
      where("__name__", ">=", randomId),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs[0].data();
  }

  return { start };
};
