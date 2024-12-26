import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { logout, user } = useAuth0();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col bg-white items-center p-6 border rounded-lg shadow-md w-[50%] mx-auto">
        <img
          src={user?.picture}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="mt-4 text-2xl font-semibold">{user?.name}</h2>
        <p className="mt-2 text-sm text-gray-600 break-words break-all ">
          {user?.email}
        </p>
        <p className="mt-2 text-lg text-gray-600">{user?.phone_number}</p>
        <button
          onClick={() => logout()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
