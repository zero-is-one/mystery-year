import { useState } from "react";
import { BsFlagFill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";

export const Flag = () => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [reportSent, setReportSent] = useState<boolean>(false);

  const reasonsForReporting = [
    "Not a photo",
    "Copyright",
    "Sexual",
    "Offensive",
    "Wrong year",
    "Other",
  ];

  return (
    <>
      <button
        className={`btn btn-${
          reportSent ? "info" : "secondary"
        } d-flex justify-content-center align-items-center`}
        style={{
          width: 40,
          height: 40,
          position: "absolute",
          top: -48,
          right: 8,
          padding: 0,
        }}
        onClick={() => {
          setDialogVisible(!dialogVisible);
        }}
      >
        {reportSent ? (
          <AiOutlineFileDone size={"1.6em"} />
        ) : (
          <BsFlagFill size={"1em"} />
        )}
      </button>
      {dialogVisible && (
        <div
          style={{
            width: 290,
            height: 140,
            position: "absolute",
            top: -200,
            right: 8,
            background: "white",
            borderRadius: 8,
            boxShadow: "0 0 8px 0 rgba(0, 0, 0, 0.2)",
            padding: 12,
          }}
        >
          <h6 className="text-secondary">What would you like to report?</h6>
          {reasonsForReporting.map((reason) => (
            <button
              key={reason}
              type="button"
              className="btn btn-secondary btn-sm my-1 me-1"
              onClick={() => {
                setDialogVisible(!dialogVisible);
                setReportSent(true);
              }}
            >
              {reason}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
