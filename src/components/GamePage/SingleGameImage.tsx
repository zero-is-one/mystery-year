import { useState } from "react";
import { Viewer } from "./Viewer";
import "viewerjs-react/dist/index.css";
import "react-awesome-animated-number/dist/index.css";
import testImg from "assets/images/test-image.jpg";
//import testImg2 from "assets/images/test-image2.jpg";
import AnimatedNumber from "react-awesome-animated-number";
import { BsArrowRightShort } from "react-icons/bs";
import { GiRoundStar } from "react-icons/gi";
import { animate, motion, AnimatePresence } from "framer-motion";
import { Range } from "./Range";
import { CaretSelector } from "./CaretSelector";
import { Scope } from "./Scope";
import { useSingleImageGameData } from "hooks/useSingleImageGameData/useSingleImageGameData";

export const SimgleGameImage = ({
  year,
  totalPoints,
  onSubmit,
  onNext,
  imgUrl,
}: {
  year: number;
  totalPoints: number;
  onSubmit: (points: number) => void;
  onNext: () => void;
  imgUrl: string;
}) => {
  const {
    makeGuess,
    minYear,
    maxYear,
    points,
    guessYear,
    targetYear,
    hasMadeGuess,
    color: guessPointColor,
  } = useSingleImageGameData(year);

  const [rangeVal, setRangeVal] = useState<number>(1950);

  const submitGuess = () => {
    const userGuess = rangeVal;
    animate(userGuess, targetYear, {
      duration: 0.2,
      onUpdate: (latest) => setRangeVal(Math.floor(latest)),
    });
    const points = makeGuess(userGuess);

    onSubmit(points);
  };

  return (
    <div>
      <div className="" style={{ position: "relative" }}>
        <div className="game-info-card" style={{ right: 0, left: "auto" }}>
          <small>Points</small>

          <AnimatedNumber value={totalPoints} duration={100} size={16} />
        </div>
        <div className="game-info-card">
          <small>Round</small>
          <p className="m-0">1 / 5</p>
        </div>
      </div>

      <Viewer imageUrl={imgUrl} />

      <div className="d-flex justify-content-end align-items-center">
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="me-4"
              transition={{ duration: 0.3 }}
              key={hasMadeGuess ? "yes" : "no"}
            >
              {hasMadeGuess
                ? `This photo was taken on:`
                : `When was this photo taken?`}
            </motion.p>
          </AnimatePresence>
        </div>
        <div>
          <AnimatedNumber
            className="game-large-number"
            value={rangeVal}
            duration={100}
            hasComma={false}
            size={96}
          />
        </div>
        <div style={{ width: "33%" }}>
          <AnimatePresence mode="wait">
            {!hasMadeGuess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="me-4"
                transition={{ duration: 0.3 }}
              >
                <CaretSelector value={rangeVal} setValue={setRangeVal} />
              </motion.div>
            )}

            {hasMadeGuess && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="ms-4"
                  transition={{ duration: 0.3 }}
                >
                  {targetYear === guessYear && (
                    <GiRoundStar color="#F2BB29" size={30} className="spin" />
                  )}
                  <span style={{ color: guessPointColor, fontSize: 22 }}>
                    +{points}{" "}
                  </span>
                  <small>points</small>
                </motion.div>
              </AnimatePresence>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Range
        value={rangeVal}
        setValue={setRangeVal}
        minValue={minYear}
        maxValue={maxYear}
        disabled={hasMadeGuess}
      />
      <Scope
        minValue={minYear}
        maxValue={maxYear}
        range={[guessYear, targetYear]}
        rangeColor={guessPointColor}
        rangeLabel={`${guessYear}`}
      />

      <div className="d-flex align-items-center justify-content-center">
        {!guessYear && (
          <button
            className="btn me-4 my-2 btn-lg btn-primary d-flex align-items-center justify-content-center"
            style={{ minWidth: 260 }}
            onClick={submitGuess}
          >
            Make A Guess
            <BsArrowRightShort size={"2em"} />
          </button>
        )}{" "}
        {guessYear && (
          <button
            className="btn me-4 my-2 btn-lg btn-secondary d-flex align-items-center justify-content-center"
            style={{ minWidth: 260 }}
            onClick={() => {
              onNext();
            }}
          >
            Next Image
            <BsArrowRightShort size={"2em"} />
          </button>
        )}
      </div>
    </div>
  );
};
