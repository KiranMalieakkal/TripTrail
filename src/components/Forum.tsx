import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ForumCard from "./ForumCard";
import countries from "../assets/countries";

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
  const [tripdata, setTripdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/users/forum`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  useEffect(() => {
    setTripdata(data);
    setFilteredData(data);
  }, [data]);

  function handleChange(e) {
    console.log(e.target.value);
    e.target.value === "All"
      ? setFilteredData(tripdata)
      : setFilteredData(
          filteredData.filter(
            (item: dataType) => item.countryName === e.target.value
          )
        );
  }
  return (
    <>
      <h1 className="text-lg text-center font-bold mt-8 lg:mt-32 ">
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
      <div className="forum grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:mb-16 md:mb-16 ">
        {filteredData?.map((trip: dataType) => (
          <ForumCard key={trip.tripId} trip={trip} />
        ))}
      </div>
    </>
  );
}
export default Forum;
