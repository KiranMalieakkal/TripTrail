import { useNavigate } from "react-router-dom";
type Props = {
  id: number;
  places: string;
  country: string;
  duration: number;
  budget: number;
  journalEntry: string;
  travelTips: string;
  image: string;
  date: string;
};
const CountryCard = ({
  id,
  places,
  country,
  // duration,
  budget,
  // journalEntry,
  // travelTips,
  image,
  date,
}: Props) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`traveldetails/${id}`);
  };
  return (
    <>
      <div
        className="bg-white shadow-md rounded-lg flex items-center p-4 mb-4"
        onClick={handleCardClick}
      >
        <img src={image} alt="" className="w-16 h-16 rounded mr-6" />
        <div className="flex-1">
          <h1 className="text-lg text-custom-font-primary  font-bold">
            {country}
          </h1>
          <div className="text-sm">
            <div className="flex">
              <p className="text-custom-font-primary mr-1">Places: </p>
              <p className="text-custom-font-primary  font-semibold">
                {places}
              </p>
            </div>
            <div className="flex">
              <p className="text-custom-font-primary  mr-1">Date: </p>
              <p className="text-custom-font-primary font-semibold">{date}</p>
            </div>
          </div>
        </div>
        <div className="ml-4 text-center text-sm">
          <p className="text-sm  text-custom-font-primary ">Budget</p>
          <p className="text-lg font-semibold text-custom-font-primary">
            {budget}
          </p>
        </div>
      </div>
    </>
  );
};
export default CountryCard;
