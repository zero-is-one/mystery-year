import RViewerJS from "viewerjs-react";
import React from "react";
import { Range } from "react-range";
import "viewerjs-react/dist/index.css";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";
import testImg from "assets/images/test-image.jpg";
import testImg2 from "assets/images/test-image2.jpg";

export const GamePage: React.FC = (props: any) => {
  const [rangeVal, setRangeVal] = React.useState<number>(1950);
  const [imageUrl, setImageUrl] = React.useState<string>(testImg);

  const startYear = 1900;
  const endYear = new Date().getFullYear();
  const yearInterval = window.innerWidth < 700 ? 20 : 10;

  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col">
            <Viewer imageUrl={imageUrl} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-center align-items-center">
              <p className="me-4">This photo was taken in:</p>
              <AnimatedNumber
                value={rangeVal}
                duration={100}
                hasComma={false}
                size={96}
              />
              <div className="d-flex flex-column">
                <button
                  style={{ width: 86, height: 40 }}
                  className="btn btn-outline-secondary border-0 p-1"
                  onClick={() => setRangeVal(rangeVal + 1)}
                >
                  ▲
                </button>
                <button
                  style={{ width: 86, height: 40 }}
                  className="btn btn-outline-secondary border-0 p-1"
                  onClick={() => setRangeVal(rangeVal - 1)}
                >
                  ▼
                </button>
              </div>
            </div>
            <Range
              step={1}
              min={startYear}
              max={endYear}
              values={[rangeVal]}
              onChange={(values) => setRangeVal(values[0])}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "12px",
                    borderRadius: "4px",
                    width: "100%",
                    backgroundColor: "#ccc",
                    boxShadow:
                      "inset 4px 4px 10px rgb(0 0 0 / 20%), inset 1px 1px 0 rgb(0 0 0 / 25%), 1px 1px 0 rgb(255 255 255 / 50%)",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "32px",
                    width: "32px",
                    borderRadius: "100px",
                    background:
                      "radial-gradient(ellipse at center,  #E1E1E1 0%,#E1E1E1 30%,#E1E1E1 30%,transparent 30%,transparent 30%), linear-gradient(to bottom, #f5f5f5 0%, #cccccc 100%)",
                    boxShadow: "inset 0 0 10px 0px #aaa, 0 2px 3px #555",
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col" style={{ minHeight: 40 }}>
            <div style={{ position: "relative", userSelect: "none" }}>
              {[...Array(Math.floor((endYear - startYear) / yearInterval))].map(
                (_, i) => {
                  const year = startYear + i * yearInterval;
                  const position =
                    ((year - startYear) / (endYear - startYear)) * 100;

                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        left: position + "%",
                        opacity: 0.18,
                        borderLeft: "1px solid #BCBCBC",
                        paddingLeft: 5,
                        paddingTop: 20,
                      }}
                    >
                      {year}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col d-flex align-items-center justify-content-center">
            <button
              className="btn me-4 my-2 btn-lg btn-light d-flex align-items-center justify-content-center"
              style={{ minWidth: 260 }}
            >
              Make A Guess
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right ms-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

const Viewer = React.memo(({ imageUrl }: { imageUrl: string }) => {
  const height = window.innerHeight - 440;

  const options = {
    inline: true,
    navbar: false,
    title: false,
    toolbar: false,
    initialCoverage: 0.5,
    rotatable: false,
    minHeight: height,
    zoomRatio: 0.5,
  };

  return (
    <div style={{ height }}>
      {/* @ts-ignore */}
      <RViewerJS options={options}>
        <img src={imageUrl} alt="" style={{ display: "none" }} />
      </RViewerJS>
    </div>
  );
});
