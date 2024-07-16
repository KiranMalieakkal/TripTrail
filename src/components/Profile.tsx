import { useState } from "react";

function Profile() {
  const [profileData, setProfileData] = useState({
    avatar:
      "https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-png-image_3918418.jpg", // default or fetched avatar URL
    username: "John Doe",
    countriesVisited: 5, // example number of countries visited
  });

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col bg-white items-center p-6 border rounded-lg shadow-md w-64 mx-auto">
        <img
          src={profileData.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="mt-4 text-2xl font-semibold">{profileData.username}</h2>
        <p className="mt-2 text-lg text-gray-600">
          Countries Visited: {profileData.countriesVisited}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
