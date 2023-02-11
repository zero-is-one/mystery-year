import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "hooks/useUser/useUser";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useFirestore } from "hooks/useFirebase/useFirebase";
import {
  getFunctions,
  httpsCallable,
  //  connectFunctionsEmulator,
} from "firebase/functions";
import { Photo } from "types/Photo";
import { YearGuess } from "types/YearGuess";
const functions = getFunctions();
// connectFunctionsEmulator(functions, "localhost", 5001);
const createGame = httpsCallable(functions, "createGame");

export const useGames = () => {
  const firestore = useFirestore();
  const navigate = useNavigate();
  const { authUser } = useUser();
  const [isLoadingNewGame, setIsLoadingNewGame] = useState(false);

  async function start() {
    setIsLoadingNewGame(true);
    const r: any = await createGame();
    navigate(`/${r.data.id}`);
  }

  async function complete(
    gameId: string,
    photos: Photo[],
    guesses: YearGuess[]
  ) {
    if (!authUser) return;

    const result = await addDoc(
      collection(firestore, "users", authUser?.uid, "games"),
      {
        photos,
        guesses,
        gameId,
        createdAt: Timestamp.now(),
      }
    );

    navigate(`/result/${result?.id}`);

    return result;
  }

  return { start, isLoadingNewGame, complete };
};
