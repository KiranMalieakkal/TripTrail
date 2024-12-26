import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import mapimage from "../assets/World_Map.png";
import logo from "../assets/TripTrail_home.png";

function Login() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="">
      <div className="hero min-h-screen bg-black ">
        <div className="hero-content text-neutral-content text-center flex lg:flex-row flex-col">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl lg:text-8xl font-bold">TripTrail</h1>
            <p className="mb-5">
              Welcome to TripTrail! Whether you're an avid traveler or just
              starting your journey, our app is designed to help you track and
              save every adventure. With an interactive map that highlights the
              countries you've visited, TripTrail lets you visually explore your
              travel history in a simple and engaging way. Start documenting
              your trips today and create a personalized map of your travels!
            </p>
          </div>
          <div className="">
            <img className="" src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <div className="bg-white second_container  flex flex-col  border-b-2 border-gray-400 lg:grid lg:grid-cols-2 lg:justify-center lg:items-center md:grid md:grid-cols-2 md:justify-center md:items-center min-h-screen">
        <div className="flex justify-center">
          <div className="p-5">
            <p className="text-black font-mono font-extrabold text-5xl text-center pt-10 lg:text-8xl md:text-8xl lg:pt-0">
              Travel
            </p>
            <p className="text-black font-mono font-extrabold text-5xl text-center lg:text-8xl md:text-8xl lg:pt-0">
              Map
            </p>
            <p className="py-5 text-black text-lg text-center px-10  lg:px-0">
              Highlight your adventures on a dynamic map. Plan your next
              destination and watch your map evolve as you explore the world!
            </p>
          </div>
        </div>
        <div className="flex justify-center  ">
          <img src={mapimage} alt="Logo" className="" />
        </div>
      </div>

      <footer className=" bg-neutral text-neutral-content text-center  p-4">
        <p className="text-center">
          Copyright © {new Date().getFullYear()} TripTrail - All right reserved
        </p>
      </footer>
      {!isAuthenticated && (
        <div className="btm-nav border-transparent text-current btm-nav-lg bg-gray-100 shadow-sky-600 w-auto">
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default Login;
