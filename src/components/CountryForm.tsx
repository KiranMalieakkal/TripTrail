import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import countries from "../assets/countries";

export type NewPost = {
  name: string;
  bootcamp: string;
};

function CountryForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: "",
    places: "",
    startDate: "",
    duration: "",
    budget: "",
    journalEntry: "",
    travelTips: "",
  });

  //   const [invalidInputError, setError] = useState("");

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = event.target;
    // setError("");
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    if (name === "country") event.target.blur;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // if (formData.fullName == "") {
    //   setError("Enter full name");
    // } else if (formData.bootCamp == "") {
    //   setError("Choose a bootcamp");
    // } else {
    //   setError("");
    //   setFormData({
    //     fullName: "",
    //     bootCamp: "",
    //   });
    //   postDeveloper({
    //     name: formData.fullName,
    //     bootcamp: formData.bootCamp,
    //   });

    console.log(formData);
    // navigate("/dashboard/section1");
  }

  return (
    <>
      <div className=" bg-journal bg-center h-screen flex justify-center mt-10 bg-animated">
        <div className="formContainer bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-lg overflow-y-auto">
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
                Country
              </label>
              <select
                id="country"
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.country}
                onFocus={(e) => {
                  e.target.size = 10;
                }}
                onBlur={(e) => {
                  e.target.size = 1;
                }}
                onChange={handleChange}
                name="country"
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
                Places Visited
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
                Start Date
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
                Duration of the Trip (days)
              </label>
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Duration of the Trip"
                value={formData.duration}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="budget"
                className="block text-gray-700 font-medium mb-1"
              >
                Total Per Head Budget
              </label>
              <input
                id="budget"
                name="budget"
                type="number"
                min={0}
                step={100}
                placeholder="Budget"
                value={formData.budget}
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
                value={formData.travelTips}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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
