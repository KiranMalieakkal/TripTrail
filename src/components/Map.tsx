import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Feature, Geometry } from "geojson";
import mapdata from "../assets/mapdata";
import mockdata from "../assets/mockdata";
import { useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson";

interface CustomProperties {
  iso_a3: string;
  name: string;
}

function Map() {
  const countryNames = mockdata.map((entry) => entry.country);
  const countriesToColor = ["USA", "CAN", "BRA"]; // ISO codes of countries to color
  let count = 0;
  return (
    <>
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={mapdata}>
            {({ geographies }) =>
              geographies.map((geo: Feature<Geometry, CustomProperties>) => {
                const { iso_a3, name } = geo.properties;
                const isColored = countryNames.includes(name);
                //   console.log(name + ++count);
                return (
                  <>
                    <Geography
                      key={geo.id}
                      geography={geo}
                      fill={isColored ? "black" : "white"}
                      stroke="#FFF"
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "black" },
                        pressed: { outline: "none" },
                      }}
                    />
                  </>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}

export default Map;
