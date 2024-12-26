import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { Feature, Geometry } from "geojson";
import mapdata from "../assets/mapdata";
import { ChangeEvent, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dataType } from "./Home";
import { FaGlobe } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";

interface CustomProperties {
  iso_a3: string;
  name: string;
}

function Map() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const baseURL = import.meta.env.VITE_BASE_URL;

  const [aiSuggestion, setAisuggestion] = useState<string>("");

  useEffect(() => {
    console.log("isauthenticated useEffect");
    if (isAuthenticated) {
      console.log("Authenticated");
      getAccessTokenSilently()
        .then((token) => {
          console.log("token=", token);
          setTheToken(token);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const { data } = useQuery({
    queryKey: ["fetch3"],
    queryFn: () =>
      fetch(`${baseURL}api/users/${user?.email}/trips`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.resolve([]);
          }
          return response.json();
        })
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
    enabled: () => !!user?.email && !!theToken,
  });
  const [countryNames, setCountrynames] = useState<string[]>([]);
  const [mapProjection, setMapProjection] = useState("geoEqualEarth");
  const projectionList = [
    "geoAlbers",
    "geoAlbersUsa",
    "geoAzimuthalEqualArea",
    "geoAzimuthalEquidistant",
    "geoOrthographic",
    "geoConicConformal",
    "geoConicEqualArea",
    "geoConicEquidistant",
    "geoStereographic",
    "geoMercator",
    "geoTransverseMercator",
  ];

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
      content: `Imagine you are displaying a suggestion to a user with the name ${user?.name} in a app and he/she has travlled to these countries ${countryNames}. Give the user suggestion refeering to the users name on countries he/she should travel right now according to current season and why in 25 words`,
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

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setMapProjection(e.target.value);
  }

  return (
    <>
      <div className="flex justify-end items-center w-full mr-10">
        <p className="mr-2">mapProjections: </p>
        <select
          id="country"
          className="block lg:w-1/5 md:w-1/3 w-1/5 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleChange}
          name="countryName"
        >
          <option value="geoEqualEarth">geoEqualEarth</option>
          {projectionList.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <ComposableMap projection={mapProjection}>
        <ZoomableGroup>
          <Geographies geography={mapdata}>
            {({ geographies }) =>
              geographies.map((geo: Feature<Geometry, CustomProperties>) => {
                const { name } = geo.properties;
                const isColored = countryNames?.includes(name);
                // console.log(countryNames);
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
      <div className="mb-24 text-sm md:mb-24 lg:mb-4 bg-black ml-8 mr-8 shadow-2xl rounded-lg">
        {countryNames && (
          <p className="text-base font-semibold text-white flex justify-center items-center text-center">
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
