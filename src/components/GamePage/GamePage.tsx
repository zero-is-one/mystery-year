import { useState } from "react";
import { SimgleGameImage } from "./SingleGameImage";
import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useFirestore } from "hooks/useFirebase/useFirebase";
import { motion, AnimatePresence } from "framer-motion";
import { YearGuess } from "types/YearGuess";
import { useGames } from "hooks/useGames/useGames";
const imageUrlHost =
  "https://firebasestorage.googleapis.com/v0/b/mystery-year.appspot.com/o/images%2F";

export const GamePage = () => {
  const { complete } = useGames();
  const { gameId } = useParams();
  const firestore = useFirestore();
  const [gameData, loading, error] = useDocumentData(
    gameId ? doc(firestore, "games", gameId.toLowerCase()) : null
  );

  const [photoIndex, setPhotoIndex] = useState(0);
  const [guesses, setGuesses] = useState<YearGuess[]>([]);
  const totalPoints = guesses.reduce((acc, guess) => acc + guess.points, 0);

  const onSubmit = (guessYear: number, targetYear: number) => {
    const maxYearsOff = 48;
    const maxPoints = 5000;

    const yearsOff = Math.abs((guessYear || 0) - (targetYear || 0));
    const yearPoints = Math.max(maxYearsOff - yearsOff, 0);
    const points = Math.floor((yearPoints / maxYearsOff) * maxPoints);

    setGuesses([...guesses, { year: guessYear, points }]);

    return points;
  };

  const onNext = async () => {
    if (photoIndex >= 4) {
      return await complete(gameId || "", gameData?.photos, guesses);
    }
    setPhotoIndex(photoIndex + 1);
  };

  const photo = gameData?.photos[photoIndex];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gameData && !loading) return <div>Game not found</div>;

  return (
    <>
      <main>
        <div className="container" style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={photoIndex}
            >
              <SimgleGameImage
                gameId={gameId || ""}
                photoIndex={photoIndex}
                roundTotal={gameData?.photos.length || 1}
                targetYear={photo.year}
                totalPoints={totalPoints}
                onSubmit={onSubmit}
                onNext={onNext}
                imgUrl={`${imageUrlHost}${photo.imageId}?alt=media`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};
