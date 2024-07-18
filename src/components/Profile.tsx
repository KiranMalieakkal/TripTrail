import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userdata from "../assets/userdata";

type Props = {
  username: string;
};
type Props2 = {
  avatar: string | undefined;
  username: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  image: string | undefined;
};

function Profile({ username }: Props) {
  const navigate = useNavigate();
  const user = userdata.find((user) => user.username === username);
  const [profileData, setProfileData] = useState<Props2>({
    avatar:
      "https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-user-avatar-placeholder-png-image_3918418.jpg",
    username: "",
    email: "",
    phone: "",
    image: "",
  });
  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    setProfileData({
      avatar: user?.image,
      username: user?.username,
      email: user?.email,
      phone: user?.phone,
      image: user?.image,
    });
  }, [user]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col bg-white items-center p-6 border rounded-lg shadow-md w-auto mx-auto">
        <img
          src={profileData?.image}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h2 className="mt-4 text-2xl font-semibold">{username}</h2>
        <p className="mt-2 text-lg text-gray-600">{profileData?.email}</p>
        <p className="mt-2 text-lg text-gray-600">{profileData?.phone}</p>
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
