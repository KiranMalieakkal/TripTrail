import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewPost } from "./CountryForm";
import toast, { Toaster } from "react-hot-toast";
import { useAuth0 } from "@auth0/auth0-react";

type Params = {
  id: string;
};

function TravelEntry() {
  const { id } = useParams<Params>();
  // const numericId = parseInt(id!);

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [theToken, setTheToken] = useState<string>();
  const [invalidInputError, setError] = useState("");
  const [postErrorDisplay, setPostErrorDisplay] = useState(false);
  const [deleteErrorDisplay, setDeleteErrorDisplay] = useState(false);
  const [fetchErrorLog, setfetchErrorLog] = useState("");
  const baseURL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    countryName: "",
    places: "",
    startDate: "",
    duration: 0,
    budget: 0,
    journalEntry: "",
    travelTips: "",
  });

  useEffect(() => {
    console.log("isauthenticated useEffect");
    if (isAuthenticated) {
      console.log("Authenticated");
      getAccessTokenSilently()
        .then((token) => {
          console.log("token=", token);
          setTheToken(token);
        })
        .catch((err) => {
          console.log("err=", err);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  const { data, isError: fetchError } = useQuery({
    queryKey: ["fetch2"],
    queryFn: () =>
      fetch(`${baseURL}api/users/${user?.email}/trips/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.resolve({});
          }
          return response.json();
        })
        .then((data) => data)
        .catch((e) => {
          setfetchErrorLog(e.message);
        }),
    enabled: () => !!user?.email && !!theToken,
  });

  const queryClient = useQueryClient();
  const {
    mutate: postTrip,
    error: postError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(`${baseURL}api/users/${user?.email}/trips/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch2"] });
    },
  });

  const {
    mutate: deleteTrip,
    error: deleteError,
    isPending: deleteStatus,
  } = useMutation<unknown, Error, string>({
    mutationFn: (id) =>
      fetch(`${baseURL}api/users/${user?.email}/trips/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${theToken}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch1", "fetch3"] });
      setFormData({
        countryName: "",
        places: "",
        startDate: "",
        duration: 0,
        budget: 0,
        journalEntry: "",
        travelTips: "",
      });
      navigate(-1);
    },
  });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  useEffect(() => {
    if (postError) {
      setPostErrorDisplay(true);
      setTimeout(() => {
        setPostErrorDisplay(false);
      }, 2000);
    }
  }, [postError]);

  useEffect(() => {
    if (deleteError) {
      setDeleteErrorDisplay(true);
      setTimeout(() => {
        setDeleteErrorDisplay(false);
      }, 2000);
    }
  }, [deleteError]);

  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (formData.countryName == "") {
      setError("Please select a country");
    } else if (formData.places == "") {
      setError("Please enter the places you visited ");
    } else if (formData.startDate == "") {
      setError("Start Date cannot be empty ");
    } else if (formData.duration === null) {
      setError("Please enter a  duration");
    } else if (formData.budget === null) {
      setError("Please enter a  budget");
    } else if (formData.duration <= 0) {
      setError("Please enter a positive duration");
    } else if (formData.budget <= 0) {
      setError("Please enter a postive budget");
    } else {
      setEditMode(false);
      setError("");
      postTrip({
        countryName: formData.countryName,
        places: formData.places,
        startDate: formData.startDate,
        duration: formData.duration,
        budget: formData.budget,
        journalEntry: formData.journalEntry,
        travelTips: formData.travelTips,
      });
    }
  };

  const handleEdit = () => {
    setEditMode(true);

    console.log(formData);
  };

  const handleDelete = () => {
    toast((t) => (
      <span>
        Are you sure you want to delete this trip?
        <div className="flex justify-center mt-2">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-lg text-sm mr-2"
            onClick={() => {
              deleteTrip(id!);
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-300 text-black py-1 px-3 rounded-lg text-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="container p-2 bg-center   ml-auto mr-auto min-h-screen ">
        <h1 className="text-lg text-custom-font-primary font-bold text-center lg:mt-20">
          Travel Details
        </h1>
        <div className="max-w-md mx-auto p-4 border bg-white rounded-lg shadow-md mb-20 lg:mb-0">
          <div className="flex justify-start mb-4">
            <button
              className=" text-black px-4 py-2 rounded"
              onClick={handleBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center mb-4 bg-gray-900 rounded-lg p-4">
            {" "}
            <img src={data?.image} alt="" className="w-16 h-16 rounded mr-6 " />
            <h2 className="text-2xl text-white font-bold">
              {formData.countryName}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-semibold">Places</label>
              {editMode ? (
                <input
                  type="text"
                  name="places"
                  value={formData.places}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.places}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Start Date</label>
              {editMode ? (
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.startDate}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Duration (days)</label>
              {editMode ? (
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.duration}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Budget ($)</label>
              {editMode ? (
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.budget}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Journal Entry</label>
              {editMode ? (
                <textarea
                  name="journalEntry"
                  value={formData.journalEntry}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.journalEntry}
                </p>
              )}
            </div>

            <div>
              <label className="block font-semibold">Travel Tips</label>
              {editMode ? (
                <textarea
                  name="travelTips"
                  value={formData.travelTips}
                  onChange={handleChange}
                  className="w-full border px-2 py-1 rounded"
                />
              ) : (
                <p className="break-words whitespace-normal">
                  {formData.travelTips}
                </p>
              )}
              {invalidInputError && (
                <p className="text-red-500 break-words whitespace-normal text-center">
                  {invalidInputError}
                </p>
              )}
              {postErrorDisplay && (
                <p className="text-red-500 break-words whitespace-normal">{`Sorry, Changes could not be saved. Please try again later. ${postError}`}</p>
              )}
              {isPending ||
                (deleteStatus && (
                  <p className="text-red-500 break-words whitespace-normal">{`Loading...`}</p>
                ))}
              {deleteErrorDisplay && (
                <p className="text-red-500 break-words whitespace-normal">{`Sorry, Delete did not work. Please try again later. ${postError}`}</p>
              )}
              {fetchError && (
                <p className="text-red-500 break-words whitespace-normal text-center">{`Sorry , We are unable to retrieve your data. Please try again later. ERROR MESSAGE - ${fetchErrorLog}`}</p>
              )}
              <div className="flex justify-end">
                <div>
                  {editMode ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                  ) : (
                    <button
                      className="bg-custom-secondary text-white px-4 py-2 rounded"
                      onClick={handleEdit}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 m-2 rounded"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default TravelEntry;
