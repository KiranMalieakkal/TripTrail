import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import MapComp from "./MapComp";
import Profile from "./Profile";
// import { useContext } from "react";
// import { isAuthenticatedContext } from "../App";
import BottomNav from "./BottomNav";
import TravelEntry from "./TravelEntry";
import TopNav from "./TopNav";
import CountryForm from "./CountryForm";
import Forum from "./Forum";

function Dashboard() {
  // const { isAuthenticated } = useContext(isAuthenticatedContext);

  // const { data } = useQuery({
  //   queryKey: ["fetch"],
  //   queryFn: () =>
  //     fetch(`http://localhost:3000/api/users/${username}/trips`)
  //       .then((response) => response.json())
  //       .then((data) => data),
  // });

  // if (!isAuthenticated) {
  //   return (
  //     <div className="flex flex-col items-center justify-center h-screen">
  //       <h2 className="mb-4 text-2xl">Please login to continue!!!</h2>
  //       <Link
  //         to="/"
  //         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //       >
  //         Go to Login
  //       </Link>
  //     </div>
  //   );
  // }

  return (
    <>
      {/* <div className="flex flex-col"> */}
      <div>
        <TopNav />
      </div>
      <div className="">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="map" element={<MapComp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="forum" element={<Forum />} />
          <Route path="home/traveldetails/:id" element={<TravelEntry />} />
          <Route path="home/form" element={<CountryForm />} />
        </Routes>
      </div>
      <div>
        <BottomNav />
      </div>
      {/* </div> */}
    </>
  );
}

export default Dashboard;
