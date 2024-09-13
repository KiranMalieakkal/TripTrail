import { useNavigate } from "react-router-dom";
import CountryCard from "./CountryCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPlane } from "react-icons/fa";

export type dataType = {
  countryId: number;
  tripId: number;
  countryName: string;
  places: string;
  startDate: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
  image: string;
};

export type Props = {
  username: string;
};

function Home({ username }: Props) {
  const [tripdata, setTripdata] = useState([]);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/users/${username}/trips`)
        .then((response) => response.json())
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
  });

  useEffect(() => {
    setTripdata(data);
  }, [data]);

  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <div className="px-6 py-4">
        {tripdata?.length > 0 && (
          <h1 className=" mb-6 text-lg font-bold text-center lg:mt-28 ">
            Countries Visited
          </h1>
        )}
        {tripdata?.length > 0 ? (
          tripdata?.map((trip: dataType) => (
            <CountryCard
              key={trip.tripId}
              id={trip.tripId}
              places={trip.places}
              country={trip.countryName}
              date={trip.startDate}
              duration={trip.duration}
              budget={trip.budget}
              journalEntry={trip.journalEntry}
              travelTips={trip.travelTips}
              image={trip.image}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center p-6 mt-40 ">
            <FaPlane className="text-6xl text-black mb-4 animate-bounce" />
            <p className="text-xl font-semibold text-black">
              Please add your trips
            </p>
          </div>
        )}
        <div className=" mb-24 lg:mb-4 text-center">
          <button
            className="bg-custom-secondary text-black py-3 px-12 rounded-lg mt-2 font-bold text-xl"
            onClick={() => {
              navigate("/dashboard/home/form");
              console.log(tripdata);
            }}
          >
            Add
          </button>
        </div>
        {fetchError && (
          <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry , We are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
        )}
      </div>
    </div>
  );
}
export default Home;
