import { useNavigate, useParams } from "react-router-dom";
import mockdata from "../assets/mockdata";
import { useState } from "react";

type Params = {
  id: string;
};
function TravelEntry() {
  const { id } = useParams<Params>();
  const numericId = parseInt(id!);
  const initialData = mockdata[numericId - 1];
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...initialData });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setEditMode(false);
    console.log(formData);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDelete = () => {
    navigate(-1);
    console.log(formData.country + "is deleted");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container bg-center flexas flex-col justify-center mt-10 bg-animated">
      <h1 className="text-lg text-custom-font-primary font-bold text-center">
        Travel Details
      </h1>
      <div className="max-w-md mx-auto p-4 border bg-white rounded-lg shadow-md">
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
          <img
            src={formData.image}
            alt=""
            className="w-16 h-16 rounded mr-6 "
          />
          <h2 className="text-2xl font-bold">{formData.country}</h2>
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
              <p>{formData.places}</p>
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
              <p>{formData.startDate}</p>
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
              <p>{formData.duration}</p>
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
              <p>{formData.budget}</p>
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
              <p>{formData.journalEntry}</p>
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
              <p>{formData.travelTips}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelEntry;
