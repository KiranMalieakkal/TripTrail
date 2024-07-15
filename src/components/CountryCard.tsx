type CardProps = {
  country: string;
  flagUrl: string;
};

function CountryCard({ country, flagUrl }: CardProps) {
  return (
    <div className=" flex flex-row">
      <div>
        <img src={flagUrl} alt={`${country} flag`} className="" />
      </div>
      <div className="p-4 ">
        <h2 className="text-xl font-bold">{country}</h2>
      </div>
    </div>
  );
}

export default CountryCard;
