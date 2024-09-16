// src/Section2.tsx

import Map from "./Map";

type Props = {
  username: string;
};
function MapComp({ username }: Props) {
  return (
    <>
      <div className="flex flex-col h-screen items-center justify-center ">
        <h1 className="text-lg text-center font-bold mt-8 lg:mt-32 ">
          Travel Footprints👣
        </h1>
        <Map username={username} />
      </div>
    </>
  );
}

export default MapComp;
