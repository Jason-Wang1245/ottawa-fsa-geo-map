"use client"

import * as d3 from "d3";
import { useState } from "react";
import { defaultStyles, useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import { Zoom } from "@visx/zoom";
const rewind = require("geojson-rewind");

export default function Map({ width, height, data, highlightOpacity, defaultOpacity, lineThickness, startingLatitude, startingLongitude, startingZoom, legendFontSize }) {
  rewind(data, true);
  const projection = d3.geoMercator().scale(startingZoom).center([startingLatitude, startingLongitude]);
  const [highlighted, setHighlighted] = useState(-1);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const { tooltipOpen, tooltipTop, tooltipLeft, tooltipData, hideTooltip, showTooltip } = useTooltip();

  function handleMouseMove(event, data, ref) {
    const { x, y } = localPoint(ref.current, event);
    showTooltip({
      tooltipLeft: x,
      tooltipTop: y,
      tooltipData: data,
    });
  }

  return (
    <>
      <Zoom style={{ width: "100%", height: "100%" }}>
        {(zoom) => (
          <svg style={{ width: "100%", height: "100%" }} ref={zoom.containerRef} key={"map"}>
            {data.features.map((shape, i) => {
              return (
                <>
                  <path
                    transform={zoom.toString()}
                    key={shape.id}
                    id={shape.id}
                    d={geoPathGenerator(shape)}
                    stroke="black"
                    strokeWidth={lineThickness}
                    fill={shape.properties.color}
                    fillOpacity={highlighted === i ? highlightOpacity : defaultOpacity}
                    onMouseMove={(event) => {
                      setHighlighted(i);
                      handleMouseMove(event, shape.properties, zoom.containerRef);
                    }}
                    onMouseLeave={() => {
                      setHighlighted(-1);
                      hideTooltip();
                    }}
                    onClick={() => window.open(shape.properties.link, "_blank")}
                    style={{ transition: "fill-opacity 0.5s ease-in" }}
                  />
                </>
              );
            })}
          </svg>
        )}
      </Zoom>
      {tooltipOpen && (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={{ ...defaultStyles, backgroundColor: "#EEEEEE" }}>
          <b>{tooltipData.CFSAUID}</b>
          <hr />
          {tooltipData.CFSAUID}
        </TooltipWithBounds>
      )}
    </>
  );
}
