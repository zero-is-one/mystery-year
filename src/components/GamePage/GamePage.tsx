import { useState } from "react";
import { SimgleGameImage } from "./SingleGameImage";
import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useFirestore } from "hooks/useFirebase/useFirebase";
import { animate, motion, AnimatePresence } from "framer-motion";

const imageUrlHost =
  "https://firebasestorage.googleapis.com/v0/b/mystery-year.appspot.com/o/images%2F";

export const GamePage = () => {
  let { id } = useParams();
  const firestore = useFirestore();
  const [gameData, loading, error] = useDocumentData(
    id ? doc(firestore, "games", id) : null
  );

  const [photoIndex, setPhotoIndex] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  const onSubmit = (points: number) => {
    setTotalPoints(totalPoints + points);
  };

  const onNext = () => {
    setPhotoIndex(photoIndex + 1);
  };

  const photo = gameData?.photos[photoIndex];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gameData && !loading) return <div>Game not found</div>;

  return (
    <>
      <main>
        {photoIndex < 5 && (
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key={photoIndex}
              >
                <SimgleGameImage
                  year={photo.year}
                  totalPoints={totalPoints}
                  onSubmit={onSubmit}
                  onNext={onNext}
                  imgUrl={`${imageUrlHost}${photo.imageId}?alt=media`}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {photoIndex >= 5 && (
          <div className="container">
            <h1>Game Over</h1>
            <p>You scored {totalPoints} points</p>
            {gameData?.photos.map((photo: any) => (
              <div>
                <img
                  width={100}
                  src={`${imageUrlHost}${photo.imageId}?alt=media`}
                  alt={photo.title}
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};
