import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

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
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* <Route path="/form" element={<CountryForm username={username} />} /> */}
          {/* <Route path="/traveldetails/:id" element={<TravelEntry />} /> */}
        </Routes>
      </HashRouter>
    </>
  );
}
export default App;
