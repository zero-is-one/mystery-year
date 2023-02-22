import { useGames } from "hooks/useGames/useGames";
import { BsArrowRightShort } from "react-icons/bs";

export const PlayGameButton = (props: any) => {
  const { start, isLoadingNewGame } = useGames();

  const Icon = props.Icon || BsArrowRightShort;

  return (
    <button
      onClick={() => start(props.subject)}
      className={props.className || {}}
      style={props.style || {}}
    >
      {props.label || "Play"}
      <div style={{ width: 28, height: 28, display: "inline-block" }}>
        {isLoadingNewGame && (
          <div
            className="spinner-border spinner-border-sm ms-1 my-1"
            role="status"
          >
            <span className="sr-only d-none">Loading...</span>
          </div>
        )}
        {!isLoadingNewGame && <Icon size={"2em"} />}
      </div>
    </button>
  );
};
