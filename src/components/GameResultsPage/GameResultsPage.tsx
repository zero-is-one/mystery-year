import AnimatedNumber from "react-awesome-animated-number";
import { PhotoSetting } from "types/Photo";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useUser } from "hooks/useUser/useUser";
import { doc } from "firebase/firestore";
import { useFirestore } from "hooks/useFirebase/useFirebase";
import { useParams } from "react-router-dom";
import RViewerJS from "viewerjs-react";

export const GameResultsPage = () => {
  const { gameResultId } = useParams();
  const { authUser } = useUser();
  const firestore = useFirestore();
  const [gameResult, loading, error] = useDocumentDataOnce(
    gameResultId && authUser?.uid
      ? doc(firestore, "users", authUser?.uid, "games", gameResultId)
      : null
  );
  const totalPoints = gameResult?.guesses
    ? gameResult.guesses.reduce((acc: any, guess: any) => acc + guess.points, 0)
    : 0;

  const guesses = gameResult?.guesses || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!gameResult && !loading) return <div>Game not found</div>;

  console.log({ gameResult });

  return (
    <div className="container">
      <div className=" d-flex justify-content-center align-items-center  flex-column">
        <div className="text-center">
          <p className="m-0 text-center">You scored </p>
          <AnimatedNumber
            value={totalPoints}
            duration={600}
            size={96}
            style={{ color: "white" }}
          />
          <span
            style={{
              fontSize: 48,
              marginLeft: 10,
              color: "white",
              textDecoration: "underline",
            }}
          >
            points
          </span>
        </div>

        <div className="text-center">
          <small className="me-2" style={{ opacity: 0.5 }}>
            Share this game:
            <br />
          </small>
          <strong>
            mysteryyear.com/{(gameResult?.gameId || "").toUpperCase()}
          </strong>
        </div>
      </div>

      <div className="row justify-content-md-center">
        {(gameResult?.photos || []).map((photo: any, index: number) => (
          <div className="col-6 col-md-4 col-lg-4 my-3">
            <div className="card h-100" style={{ position: "relative" }}>
              <div className="game-info-card">
                <small>Year</small>
                {photo.year}
              </div>
              {/* @ts-ignore */}
              <RViewerJS options={{ toolbar: false, navbar: false }}>
                <img
                  src={`${PhotoSetting.ImageHost}${photo.imageId}?alt=media`}
                  className="card-img-top"
                  alt="..."
                  style={{
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                />
              </RViewerJS>
              <div className="card-body">
                <p className="card-text">
                  You guessed{" "}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    {guesses[index].year}
                  </span>{" "}
                  for{" "}
                  <span style={{ color: "white", fontWeight: "bold" }}>
                    +{guesses[index].points}
                  </span>{" "}
                  points
                </p>

                <h5 className="card-title">{photo.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
