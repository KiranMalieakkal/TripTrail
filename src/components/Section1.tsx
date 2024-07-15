import { useNavigate } from "react-router-dom";
import mockdata from "../assets/mockdata";
import CountryCard from "./CountryCard";

function Section1() {
  const navigate = useNavigate();

  const cards = mockdata.map((data) => {
    return (
      <CountryCard
        key={data.country}
        country={data.country}
        flagUrl="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/255px-Flag_of_France.svg.png"
      />
    );
  });

  function handleClick() {
    navigate("/form");
  }
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow flex gap-2 flex-col overflow-y-auto border border-gray-300 mb-2">
          {cards}
        </div>
        <div className="py-2 text-center bg-white">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default Section1;

{
  /* <div className=" overflow-auto h-full flex md:flex-row gap-5 md:flex-wrap cardContainer flex-col"> */
}
