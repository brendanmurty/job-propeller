import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

/*

zoom 0:
only 000

zoom 1:
col 1: 100, 101
col 2: 110, 111

zoom 2:
col 1: 200, 201, 202
col 2: 210, 211, 212
col 3: 220, 221, 222



*/

const Tiler: React.FC = () => {
  const [zoom, setZoom] = React.useState(1);
  const [isPanning, setPanning] = React.useState(false);
  const [origin, setOrigin] = React.useState([0, 0]);

  const zoomIn = () => {
    if (zoom !== MAX_ZOOM) {
      setZoom((zoom) => zoom + 1);
    }
  }

  const zoomOut = () => {
    if (zoom !== 0) {
      setZoom((zoom) => zoom - 1);
    }
  }

  const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
    const isZoomingIn = event.deltaY > -1;
    
    if (isZoomingIn) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const onPan = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isPanning) {
      return;
    }
    setOrigin(([originX, originY]) => [
      originX + event.movementX,
      originY + event.movementY,
    ]);
  };

  // Get the array of rows and cols of map images, which exponentially increase by a power of 2 at each zoom level
  const rowsAndCols = [...Array(Math.pow(2, zoom))].map((_, i) => i);
  
  return (
    <div
      style={{
        width: VIEWPORT_SIZE,
        height: VIEWPORT_SIZE,
        background: "#0009",
        overflow: "hidden",
        position: "relative"
      }}
      onMouseDown={() => setPanning(true)}
      onMouseUp={() => setPanning(false)}
      onMouseMove={onPan}
      onMouseLeave={() => setPanning(false)}
    >
      <div style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 10000,
          fontSize: "140%",
          backgroundColor: "red"
        }}>
        <a onClick={() => zoomIn()}>+</a>
        <a onClick={() => zoomOut()}>-</a>
        <div>current zoom: {zoom}</div>
      </div>
      <div
        onWheel={handleScroll}
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          left: origin[0],
          top: origin[1],
        }}
        draggable={false}
      >
        {rowsAndCols.map((col) => (
          <div
            key={col}
            draggable={false}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {rowsAndCols.map((row) => (
              <img
                key={row}
                draggable={false}
                src={getTilePath(zoom, col, row)}
                alt="1"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiler;
