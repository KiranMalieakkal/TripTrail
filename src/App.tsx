import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createContext, useState } from "react";

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

export const isAuthenticatedContext = createContext<IsAuthenticatedContextType>(
  {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
  }
);

function App() {
  const [username, setUsername] = useState("default");
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
            {/* <Route path="/form" element={<CountryForm username={username} />} /> */}
            {/* <Route path="/traveldetails/:id" element={<TravelEntry />} /> */}
          </Routes>
        </BrowserRouter>
      </isAuthenticatedContext.Provider>
    </>
  );
}
export default App;
