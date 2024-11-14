import React from "react";
import { getTilePath } from "./getTile";

const MAX_ZOOM = 3;

const VIEWPORT_SIZE = 400;

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

  // Initialise an array for the map images, where the number of items
  // exponentially increases by a power of 2 at each zoom level.
  const rowsAndCols = [...Array(Math.pow(2, zoom))].map((_, i) => i);
  
  // TODO: Move inline styles in to a new CSS file for this component, apply new "className" attributes here as needed.

  // TODO: Cursor should change to the "grab" hand when user is dragging.

  // TODO: Improve design of zoom features, could be a slider instead of buttons and text zoom level display.

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
        <button onClick={() => zoomIn()}>+</button>
        <button onClick={() => zoomOut()}>-</button>
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
