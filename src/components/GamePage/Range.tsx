import { Range as ReactRange } from "react-range";
import "viewerjs-react/dist/index.css";
import "react-awesome-animated-number/dist/index.css";

export const Range = ({
  value,
  setValue,
}: {
  value: number;
  setValue?: (val: number) => void;
}) => {
  const startYear = 1900;
  const endYear = new Date().getFullYear();
  const yearInterval = window.innerWidth < 700 ? 20 : 10;

  return (
    <div>
      <ReactRange
        step={1}
        min={startYear}
        max={endYear}
        values={[value]}
        onChange={(values) => {
          if (!setValue) return;
          setValue(values[0]);
        }}
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
      <div style={{ position: "relative", userSelect: "none", height: 60 }}>
        {[...Array(Math.floor((endYear - startYear) / yearInterval))].map(
          (_, i) => {
            const year = startYear + i * yearInterval;
            const position = ((year - startYear) / (endYear - startYear)) * 100;

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
  );
};
