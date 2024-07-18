import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
import { Feature, Geometry } from "geojson";
import mapdata from "../assets/mapdata";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataType } from "./Home";
import { FaGlobe } from "react-icons/fa";

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
  const [countryNames, setCountrynames] = useState<string[]>([]);

  useEffect(() => {
    setCountrynames(data?.map((entry: dataType) => entry.countryName));
  }, [data]);

  const uniqueCountries = data?.reduce((acc: string[], trip: dataType) => {
    if (!acc.includes(trip.countryName)) {
      acc.push(trip.countryName);
    }
    return acc;
  }, []);

  const [fetchError, setfetchError] = useState(false);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  async function processMessageToChatGPT() {
    const systemMessage = {
      role: "system",
      content: `Imagine you are displaying a suggestion to a user with the name ${username} in a app and he/she has travlled to these countries ${countryNames}. Give the user suggestion refeering to the users name on countries he/she should travel right now according to current season and why in 25 words`,
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
        setAisuggestion(data?.choices[0].message.content);
      })
      .catch((e) => {
        setfetchError(true);
        setfetchErrorLog(e.message);
      });
  }

  useEffect(() => {
    processMessageToChatGPT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ComposableMap projection="geoConicConformal">
        {/* <Graticule stroke="#F53" /> */}
        <ZoomableGroup>
          <Geographies geography={mapdata}>
            {({ geographies }) =>
              geographies.map((geo: Feature<Geometry, CustomProperties>) => {
                const { name } = geo.properties;
                const isColored = countryNames?.includes(name);
                console.log(countryNames);
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
                        hover: { fill: "red" },
                        pressed: { fill: "red" },
                      }}
                    />
                  </>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="sm:mb-24 md:mb-24 lg:mb-4 bg-black m-10 shadow-2xl rounded-lg">
        {countryNames && (
          <p className="text-lg font-semibold text-white flex justify-center items-center text-center">
            <FaGlobe className="text-white mr-2" />
            {uniqueCountries?.length !== 1
              ? `You have travelled to ${uniqueCountries?.length} countries `
              : `You have travelled to ${uniqueCountries?.length} country`}
          </p>
        )}
        {!countryNames && (
          <p className="text-red-500 text-sm break-words whitespace-normal flex justify-center items-center text-center">
            <FaGlobe className="text-white mr-2" />
            We are having some trouble retrieving your data. Please try again
            later
          </p>
        )}
        {!fetchError &&
          (aiSuggestion !== "" ? (
            <p className=" text-white flex justify-center items-center text-center p-2">
              TripTrail AI Suggestion: {aiSuggestion}
            </p>
          ) : (
            <p className=" text-white flex justify-center items-center text-center">
              Your TripTrail Ai suggestion is loading...
            </p>
          ))}
        {fetchError && (
          <p className="text-red-500 text-sm break-words whitespace-normal flex justify-center items-center text-center">
            {" "}
            {`Sorry, TripTrail Ai is down. Please try again later.${fetchErrorLog}`}
          </p>
        )}
      </div>
    </>
  );
}

export default Map;
