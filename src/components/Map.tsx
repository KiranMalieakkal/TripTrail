import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Feature, Geometry } from "geojson";
import mapdata from "../assets/mapdata";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataType } from "./Home";
import { FaGlobe, FaLightbulb } from "react-icons/fa";

interface CustomProperties {
  iso_a3: string;
  name: string;
}

type Props = {
  username: string;
};

function Map({ username }: Props) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [aiSuggestion, setAisuggestion] = useState<string>("");
  const { data } = useQuery({
    queryKey: ["fetch3"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/users/${username}/trips`)
        .then((response) => response.json())
        .then((data) => data),
  });
  const countryNames = data?.map((entry: dataType) => entry.countryName);
  const uniqueCountries = data?.reduce((acc: string[], trip: dataType) => {
    if (!acc.includes(trip.countryName)) {
      acc.push(trip.countryName);
    }
    return acc;
  }, []);

  async function processMessageToChatGPT() {
    const systemMessage = {
      role: "system",
      content: `Imagine you are replying to a user in a app who has travlled to these countries ${countryNames}. Give the user suggestion on countries he/she should travel right now according to current season and why in 25 words`,
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setAisuggestion(data.choices[0].message.content);
      });
  }

  useEffect(() => {
    processMessageToChatGPT();
  }, []);

  return (
    <>
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={mapdata}>
            {({ geographies }) =>
              geographies.map((geo: Feature<Geometry, CustomProperties>) => {
                const { name } = geo.properties;
                const isColored = countryNames?.includes(name);
                return (
                  <>
                    <Geography
                      key={geo.id}
                      geography={geo}
                      fill={isColored ? "black" : "white"}
                      stroke="#FFF"
                      preserveAspectRatio="false"
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
      <div>
        <p className="text-lg font-semibold text-black flex justify-center items-center text-center">
          <FaGlobe className="text-black mr-2" />
          {uniqueCountries?.length !== 1
            ? `You have travelled to ${uniqueCountries?.length} countries `
            : `You have travelled to ${uniqueCountries?.length} country`}
        </p>
        <p className="mt-4 mb-6 sm:mb-20 black flex justify-center items-center text-center">
          TripTrail AI Suggestion: {aiSuggestion}
        </p>
      </div>
    </>
  );
}

export default Map;
