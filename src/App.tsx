import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { SetStateAction, createContext, useState } from "react";
import CountryForm from "./components/CountryForm";
import TravelEntry from "./components/TravelEntry";
// import { AuthProvider } from "./components/AuthProvider";

type IsAuthenticatedContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (x: boolean) => void;
};

export type trip = {
  country: string;
  places: string;
  startDate: Date | null | string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
};

type tripDetailsContextType = {
  tripDetails: trip;
  setTripDetails: (x: trip) => void;
};

export const isAuthenticatedContext = createContext<IsAuthenticatedContextType>(
  {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
  }
);

export const tripDetailsContext = createContext<tripDetailsContextType>({
  tripDetails: {
    country: "",
    places: "",
    startDate: "",
    duration: 0,
    budget: 0,
    journalEntry: "",
    travelTips: "",
  },
  setTripDetails: () => {},
});

function App() {
  const [username, setUsername] = useState("");
  const [tripDetails, setTripDetails] = useState<
    SetStateAction<{
      country: string;
      places: string;
      startDate: string | null | Date;
      duration: number;
      budget: number;
      journalEntry: string;
      travelTips: string;
    }>
  >({
    country: "",
    places: "",
    startDate: "",
    duration: 0,
    budget: 0,
    journalEntry: "",
    travelTips: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <isAuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Login username={username} setUsername={setUsername} />}
            />
            <Route
              path="/dashboard/*"
              element={<Dashboard username={username} />}
            />
            <Route path="/form" element={<CountryForm />} />
            <Route path="/traveldetails/:id" element={<TravelEntry />} />
          </Routes>
        </BrowserRouter>
      </isAuthenticatedContext.Provider>
    </>
  );
}
export default App;
