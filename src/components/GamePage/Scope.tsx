import { motion } from "framer-motion";

export const Scope = ({
  minValue,
  maxValue,
  range,
  rangeColor,
  rangeLabel,
}: {
  minValue: number;
  maxValue: number;
  range: [number | undefined, number | undefined];
  rangeColor: string;
  rangeLabel?: string;
}) => {
  const interval = window.innerWidth < 700 ? 20 : 10;

  return (
    <div
      style={{
        position: "relative",
        userSelect: "none",
        height: 60,
        zIndex: -1,
      }}
    >
      {[...Array(Math.floor((maxValue - minValue) / interval))].map((_, i) => {
        const val = minValue + i * interval;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: getPosition(val, minValue, maxValue) + "%",
              opacity: 0.18,
              borderLeft: "1px solid #BCBCBC",
              paddingLeft: 5,
              paddingTop: 20,
            }}
          >
            {val}
          </div>
        );
      })}

      {range[0] && range[1] && range[0] !== range[1] && (
        <motion.div
          style={{
            background: `linear-gradient(to right, ${rangeColor.replace(
              "100%,50%)",
              "100%,30%)"
            )} , ${rangeColor})`,
            position: "absolute",
            zIndex: -1,
            height: 12,
            transform: range[0] > range[1] ? "scaleX(-1)" : "",
            transformOrigin: "left",
            top: 4,
            left: getPosition(range[0], minValue, maxValue) + "%",
            fontSize: 10,
            display: "flex",
            alignItems: "center",

            paddingLeft: 10,
          }}
          transition={{ duration: 1 }}
          initial={{ width: 0 }}
          animate={{
            width:
              Math.abs(
                getPosition(range[1], minValue, maxValue) -
                  getPosition(range[0], minValue, maxValue)
              ) + "%",
          }}
        >
          {rangeLabel && (
            <span
              style={{
                transform:
                  range[0] > range[1]
                    ? `scaleX(-1) translateX(calc(100% + 15px))`
                    : "translateX(calc(-100% - 15px))",
              }}
            >
              {rangeLabel}
            </span>
          )}
        </motion.div>
      )}
    </div>
  );
};

const getPosition = (value: number, minValue: number, maxValue: number) => {
  return ((value - minValue) / (maxValue - minValue)) * 100;
};
