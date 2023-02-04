import { useState } from "react";
import { Viewer } from "./Viewer";
import "viewerjs-react/dist/index.css";
import "react-awesome-animated-number/dist/index.css";
import testImg from "assets/images/test-image.jpg";
import testImg2 from "assets/images/test-image2.jpg";
import AnimatedNumber from "react-awesome-animated-number";
import { BsArrowRightShort } from "react-icons/bs";
import { animate, motion, AnimatePresence } from "framer-motion";
import { Range } from "./Range";
import { CaretSelector } from "./CaretSelector";

export const GamePage = () => {
  const [year, setYear] = useState<number>(1950);
  const [helpText, setHelpText] = useState<string>(
    "When was this photo taken?"
  );
  const [imageUrl, setImageUrl] = useState<string>(testImg);

  const submitGuess = () => {
    console.log("submit guess");
    setHelpText("This photo was taken in");
    animate(year, 2000, {
      duration: 0.2,
      onUpdate: (latest) => setYear(Math.floor(latest)),
    });
  };

  return (
    <>
      <main>
        <div className="container">
          <div className="row">
            <div className="col">
              <Viewer imageUrl={imageUrl} />
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center">
            <div>
              <AnimatePresence mode="wait">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="me-4"
                  key={helpText}
                  transition={{ duration: 0.3 }}
                >
                  {helpText}
                </motion.p>
              </AnimatePresence>
            </div>
            <div>
              <AnimatedNumber
                value={year}
                duration={100}
                hasComma={false}
                size={96}
              />
            </div>
            <div style={{ width: "33%" }}>
              <CaretSelector value={year} setValue={setYear} />
            </div>
          </div>
          <Range value={year} setValue={setYear} />
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn me-4 my-2 btn-lg btn-primary d-flex align-items-center justify-content-center"
              style={{ minWidth: 260 }}
              onClick={submitGuess}
            >
              Make A Guess
              <BsArrowRightShort size={"2em"} />
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
