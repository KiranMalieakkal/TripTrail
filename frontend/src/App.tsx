import { Routes, Route, BrowserRouter } from "react-router-dom";
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
      <BrowserRouter basename={import.meta.env.VITE_APP_URI}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* <Route path="/form" element={<CountryForm username={username} />} /> */}
          {/* <Route path="/traveldetails/:id" element={<TravelEntry />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
