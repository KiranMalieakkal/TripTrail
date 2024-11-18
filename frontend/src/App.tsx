import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { createContext, useEffect, useState } from "react";

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
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if username is stored in localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Update localStorage whenever username changes
  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);
  
  return (
    <>
      <isAuthenticatedContext.Provider
        value={{ isAuthenticated, setIsAuthenticated }}
      >
        <BrowserRouter basename={import.meta.env.VITE_APP_URI}>
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
