import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "../assets/countries";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type NewPost = {
  countryName: string;
  places: string;
  startDate: string;
  duration: number | null;
  budget: number | null;
  journalEntry: string;
  travelTips: string;
};

type Props = {
  username: string;
};

function CountryForm({ username }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    mutate: postTrip,
    error: postError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch(`http://localhost:3000/api/users/${username}/trips`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => {
        if (!res.ok) {
          throw new Error(`Error Status: ${res.status}`);
        }
        return res.json();
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch1", "fetch3"] });
      setFormData({
        countryName: "",
        places: "",
        startDate: "",
        duration: null,
        budget: null,
        journalEntry: "",
        travelTips: "",
      });
      navigate("/dashboard/home");
    },
  });
  const [formData, setFormData] = useState({
    countryName: "",
    places: "",
    startDate: "",
    duration: null,
    budget: null,
    journalEntry: "",
    travelTips: "",
  });

  const [invalidInputError, setError] = useState("");
  const [postErrorDisplay, setPostErrorDisplay] = useState(false);

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    setError("");
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    if (name === "country") event.target.blur;
  }

  useEffect(() => {
    if (postError) {
      setPostErrorDisplay(true);
      setTimeout(() => {
        setPostErrorDisplay(false);
      }, 2000);
    }
  }, [postError]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    } else if (formData.duration! <= 0) {
      setError("Please enter a positive duration");
    } else if (formData.budget! <= 0) {
      setError("Please enter a postive budget");
    } else {
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

      console.log(formData);
      // navigate("/dashboard/map");
      console.log(username);
    }
  }

  return (
    <>
      <div className=" bg-journal bg-center h-screen flex justify-center mt-10 lg:mt-32 bg-animated mb-28 lg:mb-2">
        <div className="formContainer bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-lg overflow-y-auto">
          <div className="mr-auto ">
            <button className="ml-0" onClick={() => navigate(-1)}>
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
          <h1 className="text-3xl font-bold mb-6">Add Trip</h1>
          <form
            id="countryForm"
            onSubmit={handleSubmit}
            className="w-full max-w-lg space-y-6"
          >
            <div>
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-1"
              >
                <sup>*</sup>Country
              </label>
              <select
                id="country"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.countryName}
                // onFocus={(e) => {
                //   e.target.size = 10;
                // }}
                // onBlur={(e) => {
                //   e.target.size = 1;
                // }}
                // size={10}
                onChange={handleChange}
                name="countryName"
              >
                <option value="">--Choose--</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="places"
                className="block text-gray-700 font-medium mb-1"
              >
                <sup>*</sup>Places Visited
              </label>
              <textarea
                id="places"
                name="places"
                placeholder="Places Visited"
                value={formData.places}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="startDate"
                className="block text-gray-700 font-medium mb-1"
              >
                <sup>*</sup>Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-gray-700 font-medium mb-1"
              >
                <sup>*</sup>Duration of the Trip (days)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Duration of the Trip"
                value={formData.duration !== null ? formData.duration : ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-gray-700 font-medium mb-1"
              >
                <sup>*</sup>Total Per Head Budget($)
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                placeholder="Budget"
                value={formData.budget !== null ? formData.budget : ""}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="journalEntry"
                className="block text-gray-700 font-medium mb-1"
              >
                Journal Entry
              </label>
              <textarea
                id="journalEntry"
                name="journalEntry"
                placeholder="Enter your favourite moments"
                value={formData.journalEntry}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="travelTips"
                className="block text-gray-700 font-medium mb-1"
              >
                Travel Tips
              </label>
              <textarea
                id="travelTips"
                name="travelTips"
                placeholder="Enter some travel tips"
                value={formData.travelTips}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {invalidInputError && (
              <p className="text-red-500 break-words whitespace-normal text-center">
                {invalidInputError}
              </p>
            )}
            {postErrorDisplay && (
              <p className="text-red-500 break-words whitespace-normal">{`Sorry, Please try again later. ${postError}`}</p>
            )}
            {isPending && (
              <p className="text-red-500 break-words whitespace-normal">{`Loading...`}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add Trip
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CountryForm;
