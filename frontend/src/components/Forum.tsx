import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import ForumCard from "./ForumCard";
import countries from "../assets/countries";
import { useAuth0 } from "@auth0/auth0-react";

export type dataType = {
  countryId: number;
  tripId: number;
  countryName: string;
  userName: string;
  places: string;
  startDate: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
  image: string;
};

function Forum() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();
  const [tripdata, setTripdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    console.log("isauthenticated useEffect");
    if (isAuthenticated) {
      console.log("Authenticated");
      getAccessTokenSilently()
        .then((token) => {
          // console.log("token=", token);
          setTheToken(token);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const { isError: fetchError } = useQuery({
    queryKey: ["fetch8"],
    queryFn: () =>
      fetch(`${baseURL}api/users/forum`, {
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
        .then((data) => {
          setTripdata(data);
          setFilteredData(data);
          return data;
        })
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
    enabled: () => !!user?.email && !!theToken,
  });

  // useEffect(() => {
  //   setTripdata(data);
  //   setFilteredData(data);
  //   console.log("Forum 45" + data);
  // }, [data]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    console.log(e.target.value);
    e.target.value === "All"
      ? setFilteredData(tripdata)
      : setFilteredData(
          tripdata.filter(
            (item: dataType) => item.countryName === e.target.value
          )
        );
  }
  return (
    <>
      <div className="min-h-screen mb-[64px] lg:mb-0">
        <h1 className="text-lg text-center font-bold mt-auto p-2 lg:mt-16 ">
          Travel Tips
        </h1>
        <div className="flex justify-center items-center">
          <select
            id="country"
            className="block w-1/3 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            name="countryName"
          >
            <option value="All">All</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="forum grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredData?.map((trip: dataType) => (
            <ForumCard key={trip.tripId} trip={trip} />
          ))}
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry , We are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </>
  );
}
export default Forum;
