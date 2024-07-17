import { useNavigate } from "react-router-dom";
import CountryCard from "./CountryCard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
  const { data } = useQuery({
    queryKey: ["fetch1"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/users/${username}/trips`)
        .then((response) => response.json())
        .then((data) => data),
  });

  useEffect(() => {
    setTripdata(data);
  }, [data]);

  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <div className="px-6 py-4">
        <h1 className=" mb-6 text-lg font-bold text-center ">
          Countries Visited
        </h1>
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
          <div>Please add your trips</div>
        )}
        <div className=" mb-24 text-center">
          <button
            className="bg-red-500 font-inika text-white py-3 px-12 rounded-lg mt-2 font-bold text-xl"
            onClick={() => {
              navigate("/form");
              console.log(tripdata);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
