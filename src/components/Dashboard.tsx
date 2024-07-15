import { Link, Route, Routes } from "react-router-dom";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import { useContext } from "react";
import { isAuthenticatedContext } from "../App";
import BottomNav from "./BottomNav";

export type DashboardProps = {
  username: String;
};
function Dashboard({ username }: DashboardProps) {
  const { isAuthenticated } = useContext(isAuthenticatedContext);

  //   if (!isAuthenticated) {
  //     return (
  //       <div className="flex flex-col items-center justify-center h-screen">
  //         <h2 className="mb-4 text-2xl">Please login to continue!!!</h2>
  //         <Link
  //           to="/"
  //           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
  //         >
  //           Go to Login
  //         </Link>
  //       </div>
  //     );
  //   }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="section1" element={<Section1 />} />
            <Route path="section2" element={<Section2 />} />
            <Route path="section3" element={<Section3 />} />
            {/* <Route path="form" element={<CountryForm />} /> */}
          </Routes>
        </div>
        <div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
