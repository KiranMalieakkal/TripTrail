import { useNavigate, useParams } from "react-router-dom";
import mockdata from "../assets/mockdata";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NewPost } from "./CountryForm";

type Props2 = {
  countryName: string;
  places: string;
  startDate: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
};

type Params = {
  id: string;
};
type Props = {
  username: string;
};
function TravelEntry({ username }: Props) {
  const { id } = useParams<Params>();
  // const numericId = parseInt(id!);

  const [formData, setFormData] = useState({
    countryName: "",
    places: "",
    startDate: "",
    duration: 0,
    budget: 0,
    journalEntry: "",
    travelTips: "",
  });
  const [invalidInputError, setError] = useState("");
  const { data } = useQuery({
    queryKey: ["fetch2"],
    queryFn: () =>
      fetch(`http://localhost:3000/api/users/${username}/trips/${id}`)
        .then((response) => response.json())
        .then((data) => data),
  });

  const queryClient = useQueryClient();
  const {
    mutate: postTrip,
    error: postError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(`http://localhost:3000/api/users/${username}/trips/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
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
      fetch(`http://localhost:3000/api/users/${username}/trips/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch1", "fetch3"] });
      navigate(-1);
      console.log("delete successful");
    },
  });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const [editMode, setEditMode] = useState(false);
  // const [formData, setFormData] = useState({ ...initialData });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    if (formData.countryName == "") {
      setError("Please select a country");
    } else if (formData.places == "") {
      setError("Please enter the places you visited ");
    } else if (formData.startDate == "") {
      setError("Start Date cannot be empty ");
    } else if (formData.duration <= 0) {
      setError("Please enter the duration");
    } else if (formData.budget <= 0) {
      setError("Please enter a budget");
    } else if (formData.journalEntry == "") {
      setError("Please give a Journal Entry");
    } else if (formData.travelTips == "") {
      setError("Please give travel tips");
    } else {
      setError("");
      setFormData({
        countryName: "",
        places: "",
        startDate: "",
        duration: 0,
        budget: 0,
        journalEntry: "",
        travelTips: "",
      });
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
    deleteTrip(id!);
    // navigate(-1);
    console.log(formData.countryName + "is deleted");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mt-6 bg-center bg-animated mb-24 ml-auto mr-auto">
      <h1 className="text-lg text-custom-font-primary font-bold text-center lg:mt-28">
        Travel Details
      </h1>
      <div className="max-w-md mx-auto p-4 border bg-white rounded-lg shadow-md ">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
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
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 m-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
            {editMode ? (
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center mb-4 bg-gray-200 rounded-lg p-4">
          {" "}
          <img src={data?.image} alt="" className="w-16 h-16 rounded mr-6 " />
          <h2 className="text-2xl font-bold">{formData.countryName}</h2>
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
              <p className="break-words whitespace-normal">{formData.places}</p>
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
              <p className="break-words whitespace-normal">{formData.budget}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelEntry;
