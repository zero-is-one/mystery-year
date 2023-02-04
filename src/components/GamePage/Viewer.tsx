import React from "react";
import RViewerJS from "viewerjs-react";
import { BsFullscreen } from "react-icons/bs";
import { Flag } from "./Flag";
let viewer: any;

export const Viewer = React.memo(({ imageUrl }: { imageUrl: string }) => {
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
    fullscreen: false,
    ready() {
      // @ts-ignore
      viewer = this.viewer;
    },
    view() {
      // @ts-ignore
      viewer = this.viewer;
    },
  };

  return (
    <>
      <div style={{ height }}>
        {/* @ts-ignore */}
        <RViewerJS options={options}>
          <img src={imageUrl} alt="" style={{ display: "none" }} />
        </RViewerJS>
      </div>
      <div
        className="d-flex justify-content-between"
        style={{ position: "relative" }}
      >
        <button
          className="btn btn-secondary d-flex justify-content-center align-items-center"
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            top: -48,
            left: 8,
          }}
          onClick={() => {
            viewer.full();
          }}
        >
          <BsFullscreen />
        </button>
        <Flag />
      </div>
    </>
  );
});
