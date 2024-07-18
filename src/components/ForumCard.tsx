import React from "react";

type TravelTrip = {
  countryId: number;
  userName: string;
  tripId: number;
  places: string;
  countryName: string;
  startDate: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
  image: string;
};

interface ForumCardProps {
  trip: TravelTrip;
}

function ForumCard({ trip }: ForumCardProps) {
  return (
    // <div className="card bg-white rounded-lg shadow-lg overflow-hidden w-80">
    //   <img
    //     src={trip.image}
    //     alt={`${trip.countryName} flag`}
    //     className="w-full h-40 object-cover"
    //   />
    //   <div className="card-content p-4">
    //     <h3 className="text-lg font-semibold">
    //       {trip.countryName} - Tips by {trip.userName}
    //     </h3>
    //     <p className="mt-2 text-sm">
    //       {trip.travelTips.split("\n").map((line, index) => (
    //         <span key={index}>
    //           {line}
    //           <br />
    //         </span>
    //       ))}
    //     </p>
    //   </div>
    // </div>
    <div className="flex flex-col bg-white shadow-md rounded-lg ">
      <div className="  flex bg-gray-900 items-center p-4 mb-2">
        <img src={trip.image} alt="" className="w-16 h-16 rounded mr-6" />
        <div className="flex-1">
          <h1 className="text-lg text-white  font-bold">{trip.countryName}</h1>
          <p className="text-white font-semibold">Tips by: {trip.userName}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center p-2">
        <div className="flex ">
          <p className="text-custom-font-primary ">Places: </p>
          <p className="text-custom-font-primary  ">{trip.places}</p>
        </div>
        <p className="text-custom-font-primary  ">
          Travel Date: {trip.startDate}
        </p>
        <p className="text-custom-font-primary ">Budget: {trip.budget}</p>
      </div>
      <div className="ml-4 mr-2 justify-self-start">
        <p className="text-custom-font-primary ">{trip.travelTips}</p>
      </div>
    </div>
  );
}

export default ForumCard;
