// src/Section2.tsx

import Map from "./Map";

function MapComp({ username }) {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mt-10 text-lg text-center ">Travel Footprints👣</h1>
        <Map username={username} />
      </div>
    </>
  );
}

export default MapComp;
