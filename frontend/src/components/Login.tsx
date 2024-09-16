import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userdata from "../assets/userdata";
import { isAuthenticatedContext } from "../App";
import logo from "../assets/Triptrail_Logo.png";

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

  const handleLogin = () => {
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
  }
  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setLoginError(false);
    setPassword(e.target.value);
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 h-screen flex flex-col items-center justify-center ">
      <img src={logo} className="ml-4 lg:w-2/4 p-8"></img>
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center w-3/5 md:w-1/3 lg:w1/3">
        <h2 className="mb-4 text-2xl">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          className="mb-2 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
        {loginError && (
          <p className="mb-2 p-2 text-red-500">
            Please enter a valid username and password
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
