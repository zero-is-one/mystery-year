import { useState } from "react";

const maxYearsOff = 48;
const maxPoints = 5000;
const minYear = 1900;
const maxYear = 2023;

export const useSingleImageGameData = (targetYear: number) => {
  const [points, setPoints] = useState(0);
  const [guessYear, setGuessYear] = useState<number | undefined>();

  const color = getPercentColor(1 - points / maxPoints);
  const hasMadeGuess = !!guessYear;

  const makeGuess = (guess: number) => {
    setGuessYear(guess);
    const yearsOff = Math.abs((guess || 0) - (targetYear || 0));
    const yearPoints = Math.max(maxYearsOff - yearsOff, 0);
    const points = Math.floor((yearPoints / maxYearsOff) * maxPoints);
    setPoints(points);
    return points;
  };

  return {
    makeGuess,
    minYear,
    maxYear,
    points,
    color,
    hasMadeGuess,
    targetYear,
    guessYear,
  };
};

function getPercentColor(value: number) {
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}

// const submitGuess = () => {
//   const actualYear = 2000;
//   const guessYear = rangeVal;

//   console.log("submit guess");

//   setSolution(actualYear);

//   const yearsOff = Math.abs((guess || 0) - (solution || 0));
//   const yearPoints = Math.max(maxYearsOff - yearsOff, 0);
//   const points = Math.floor((yearPoints / maxYearsOff) * maxPoints);
//   setPoints(points);
//   setTotalPoints(totalPoints + points);
// };
