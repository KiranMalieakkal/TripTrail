// src/Section2.tsx

import Map from "./Map";

function MapComp() {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center ">
        <h1 className="text-lg text-center font-bold mt-8 lg:mt-20 ">
          Travel Footprints👣
        </h1>
        <Map />
      </div>
    </>
  );
}

export default MapComp;
