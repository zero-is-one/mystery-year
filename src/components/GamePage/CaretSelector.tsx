import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

export const CaretSelector = ({
  value,
  setValue,
}: {
  value: number;
  setValue?: (val: number) => void;
}) => {
  return (
    <div className="d-flex flex-column" style={{ opacity: setValue ? 1 : 0 }}>
      <button
        style={{ width: 86, height: 40 }}
        className="btn btn-outline-secondary border-0 p-1"
        onClick={() => {
          if (!setValue) return;
          setValue(value + 1);
        }}
      >
        <BsCaretUpFill size={"2em"} />
      </button>
      <button
        style={{ width: 86, height: 40 }}
        className="btn btn-outline-secondary border-0 p-1"
        onClick={() => {
          if (!setValue) return;
          setValue(value - 1);
        }}
      >
        <BsCaretDownFill size={"2em"} />
      </button>
    </div>
  );
};
