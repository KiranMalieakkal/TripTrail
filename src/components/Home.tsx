import { useNavigate } from "react-router-dom";
import mockdata from "../assets/mockdata";
import CountryCard from "./CountryCard";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full">
      <div className="px-6 py-4">
        <h1 className=" mb-6 text-lg font-bold text-center ">
          Countries Visited
        </h1>
        {mockdata.map((country) => (
          <CountryCard
            key={country.id}
            id={country.id}
            places={country.places}
            country={country.country}
            date={country.startDate}
            duration={country.duration}
            budget={country.budget}
            journalEntry={country.journalEntry}
            travelTips={country.travelTips}
            image={country.image}
          />
        ))}
        <div className=" mb-24 text-center">
          <button
            className="bg-red-500 font-inika text-white py-3 px-12 rounded-lg mt-2 font-bold text-xl"
            onClick={() => navigate("/form")}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;
