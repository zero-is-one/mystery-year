import { useState } from "react";
import { BsFlagFill } from "react-icons/bs";
import { AiOutlineFileDone } from "react-icons/ai";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useFirestore } from "hooks/useFirebase/useFirebase";
import { useUser } from "hooks/useUser/useUser";
import { Photo } from "types/Photo";

export const Flag = ({ imageUrl }: { imageUrl: string }) => {
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const firestore = useFirestore();
  const { authUser } = useUser();

  const reasonsForReporting = [
    "Not a photo",
    "Copyright",
    "Sexual",
    "Offensive",
    "Wrong year",
    "Other",
  ];

  const onClick = (reason: string) => {
    setDialogVisible(false);
    setReason(reason);
    let text = "None";
    if (reason === "Other") {
      text = prompt("Please enter the reason for reporting this photo") || "";
    }

    addDoc(collection(firestore, "flags"), {
      createdAt: Timestamp.now(),
      reason,
      text,
      userId: authUser?.uid,
      imageUrl,
    });
  };

  return (
    <>
      <button
        className={`btn btn-${
          reason ? "info" : "secondary"
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
        {reason ? (
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
          {reasonsForReporting.map((reportReason) => (
            <button
              key={reportReason}
              type="button"
              className={`btn btn-${
                reason === reportReason ? "primary" : "secondary"
              } btn-sm my-1 me-1"`}
              onClick={() => onClick(reportReason)}
            >
              {reportReason}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
