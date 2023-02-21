import { useState } from "react";
import { Viewer } from "./Viewer";

import AnimatedNumber from "react-awesome-animated-number";
import { BsArrowRightShort } from "react-icons/bs";
import { FaImages, FaTrophy } from "react-icons/fa";
import { GiRoundStar } from "react-icons/gi";
import { animate, motion, AnimatePresence } from "framer-motion";
import { Range } from "./Range";
import { CaretSelector } from "./CaretSelector";
import { Scope } from "./Scope";
import { Photo } from "types/Photo";

const minYear = 1900;
const maxYear = 2023;

export const SimgleGameImage = ({
  targetYear,
  totalPoints,
  onSubmit,
  onNext,
  imgUrl,
  roundTotal,
  photoIndex,
  photo,
}: {
  targetYear: number;
  totalPoints: number;
  onSubmit: (userGuess: number, targetYear: number) => number;
  onNext: () => void;
  imgUrl: string;
  photo: Photo;
  photoIndex: number;
  roundTotal: number;
}) => {
  const [guessYear, setGuessYear] = useState<number | undefined>();
  const [points, setPoints] = useState<number | undefined>();
  const [rangeVal, setRangeVal] = useState<number>(1950);

  const submitGuess = () => {
    const userGuess = rangeVal;
    setGuessYear(userGuess);

    animate(userGuess, targetYear, {
      duration: 0.2,
      onUpdate: (latest) => setRangeVal(Math.floor(latest)),
    });

    setPoints(onSubmit(userGuess, targetYear));
  };

  const guessPointColor = getPercentColor(
    Math.abs((guessYear || 0) - targetYear) / 48
  );

  return (
    <div>
      <div className="" style={{ position: "relative" }}>
        <div className="game-info-card" style={{ right: 0, left: "auto" }}>
          <small>Points</small>
          <AnimatedNumber value={totalPoints} duration={100} size={16} />
        </div>
        <div className="game-info-card">
          <small>Round</small>
          <p className="m-0">
            {photoIndex + 1} / {roundTotal}
          </p>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <Viewer imageUrl={imgUrl} />

        <AnimatePresence mode="wait">
          {guessYear && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                bottom: 10,
                left: 60,
                display: "block",
                padding: 20,
                width: "calc(100% - 120px)",
                background: "#000000cc",
                border: "1px solid #6c757d",
                overflow: "hidden",
                textOverflow: "ellipsis",
                borderRadius: 4,
                boxShadow: "0 0 10px 0 #000000cc",
                color: "white",
              }}
              className="text-expand"
            >
              {photo.title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="d-lg-flex justify-content-center align-items-center">
        <div style={{ flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="me-lg-4 my-2 text-center text-lg-end"
              transition={{ duration: 0.3 }}
              key={guessYear ? "yes" : "no"}
              style={{ fontSize: 18 }}
            >
              {guessYear
                ? `This photo was taken on:`
                : `When was this photo taken?`}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div style={{ flex: 1 }}></div>
          <AnimatedNumber
            className="game-large-number"
            value={rangeVal}
            duration={100}
            hasComma={false}
            size={96}
          />

          {/* mobile caret selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: guessYear ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1 }}
            className="d-block d-lg-none"
          >
            <CaretSelector value={rangeVal} setValue={setRangeVal} />
          </motion.div>
        </div>
        <div style={{ flex: 1, minHeight: 36 }}>
          <AnimatePresence mode="wait">
            {!guessYear && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="d-none d-lg-block"
              >
                <CaretSelector value={rangeVal} setValue={setRangeVal} />
              </motion.div>
            )}

            {guessYear && (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mx-4 text-center text-lg-start"
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
        disabled={!!guessYear}
      />
      <Scope
        minValue={minYear}
        maxValue={maxYear}
        range={[guessYear, targetYear]}
        rangeColor={guessPointColor}
        rangeLabel={`${guessYear}`}
      />

      <div className="d-flex align-items-center justify-content-between">
        <div style={{ position: "relative", flex: 1 }}>
          <div className="d-none d-lg-block">
            <small style={{ opacity: 0.5 }}>Share this game session:</small>
            <br />
            <strong>
              {window.location.host + window.location.pathname.toUpperCase()}
            </strong>
          </div>
        </div>
        {!guessYear && (
          <button
            className="btn mx-2 my-2 btn-lg btn-primary d-flex align-items-center justify-content-center "
            style={{ width: 280 }}
            onClick={submitGuess}
          >
            Make A Guess
            <BsArrowRightShort size={"2em"} />
          </button>
        )}{" "}
        {guessYear && (
          <button
            className="btn mx-2 my-2 btn-lg btn-secondary d-flex align-items-center justify-content-center"
            style={{ width: 280 }}
            onClick={() => {
              onNext();
            }}
          >
            {photoIndex + 1 === 5 && (
              <>
                See Results
                <FaTrophy size={"1em"} className="ms-2" />
              </>
            )}

            {photoIndex + 1 !== 5 && (
              <>
                Next Image
                <FaImages size={"1em"} className="ms-2" />
              </>
            )}
          </button>
        )}
        <div style={{ flex: 1 }}></div>
      </div>
    </div>
  );
};

function getPercentColor(value: number) {
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}
