import { HashRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";

export type trip = {
  country: string;
  places: string;
  startDate: Date | null | string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
};

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {/* <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} /> */}
      {/* <Route path="/form" element={<CountryForm username={username} />} /> */}
      {/* <Route path="/traveldetails/:id" element={<TravelEntry />} /> */}
      {/* </Routes>
      </HashRouter> */}
      <HashRouter>
        {!isAuthenticated && <Login />}
        {isAuthenticated && <Dashboard />}
      </HashRouter>
    </>
  );
}
export default App;
