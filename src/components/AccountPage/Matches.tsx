import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { useState } from "react";
import {
  collection,
  orderBy,
  query,
  startAfter,
  limit,
  Timestamp,
} from "firebase/firestore";
import { useUser } from "hooks/useUser/useUser";
import { useFirestore } from "hooks/useFirebase/useFirebase";

const matchesCount = 10;

export const Matches = () => {
  const firestore = useFirestore();
  const { authUser } = useUser();
  const [lastVisible, setLastVisible] = useState<Timestamp>(Timestamp.now());

  const [matches, loading, error] = useCollectionDataOnce(
    authUser?.uid
      ? query(
          collection(firestore, "users", authUser?.uid, "games"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(matchesCount)
        )
      : null
  );

  //if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Matches</h1>
      <ul className="list-group mb-3">
        {(matches || []).map((match, index) => {
          const totalPoints = match?.guesses
            ? match?.guesses.reduce(
                (acc: any, guess: any) => acc + guess.points,
                0
              )
            : 0;

          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <span>Total Point: {totalPoints}</span>
              <span>
                {match?.createdAt
                  ? match?.createdAt.toDate().toLocaleDateString()
                  : ""}
              </span>
            </li>
          );
        })}
      </ul>

      <div>
        {(matches?.length || 0) === matchesCount && (
          <button
            className="btn btn-primary btn-lg mx-2"
            onClick={() => {
              if (!matches) return;
              setLastVisible(matches[matches.length - 1].createdAt);
            }}
          >
            Load More
          </button>
        )}

        <button
          className="btn btn-primary btn-lg mx-2"
          onClick={() => {
            if (!matches) return;
            setLastVisible(Timestamp.now());
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
