// src/Section2.tsx

import Map from "./Map";

function MapComp({ username }) {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center ">
        <h1 className="text-lg text-center lg:mt-28 ">Travel Footprints👣</h1>
        <Map username={username} />
      </div>
    </>
  );
}

export default MapComp;
