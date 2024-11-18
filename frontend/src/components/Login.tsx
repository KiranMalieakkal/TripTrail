import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userdata from "../assets/userdata";
import { isAuthenticatedContext } from "../App";

export type LoginProps = {
  username: string;
  setUsername: (username: string) => void;
};

function Login({ username, setUsername }: LoginProps) {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(isAuthenticatedContext);
  const [loginError, setLoginError] = useState(false);

  function validateUser(enteredUsername: string, enteredPassword: string) {
    for (const user of userdata) {
      if (
        user.username === enteredUsername &&
        user.password === enteredPassword
      ) {
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateUser(username, password)) {
      navigate("/dashboard/home");
    } else {
      setLoginError(true);
      //   alert("Invalid credentials");
    }
  };
  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginError(false);
    setUsername(e.target.value);
    console.log(username);
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginError(false);
    setPassword(e.target.value);
  }

  return (
    <div className="">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TripTrail</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#login-section">Log In</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="hero min-h-screen "
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/cartoon-vector-illustration-group-friends-hiking-trip-trekking-through-scenic-trail-with-mountains-trees-background_1288601-9944.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to TripTrail</h1>
            <p className="mb-5">
              Welcome to TripTrail! Whether you're an avid traveler or just
              starting your journey, our app is designed to help you track and
              save every adventure. With an interactive map that highlights the
              countries you've visited, TripTrail lets you visually explore your
              travel history in a simple and engaging way. Start documenting
              your trips today and create a personalized map of your travels!
            </p>
            {/* <button className="btn btn-primary">Get Started</button> */}
          </div>
        </div>
      </div>
      <div className="hero bg-base-200 p-10 " id="login-section">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Already have an account? Login to track and relive your travel
              adventures. New here? Join us and start documenting your journeys
              today!
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                {loginError && (
                  <p className="mb-2 p-2 text-red-500">
                    Please enter a valid username and password
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <footer className=" bg-neutral text-neutral-content text-center  p-4">
        <p className="text-center">
          Copyright © {new Date().getFullYear()} TripTrail - All right reserved
        </p>
      </footer>
    </div>
  );
}

export default Login;
