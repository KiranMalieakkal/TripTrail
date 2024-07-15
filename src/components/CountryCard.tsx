type CardProps = {
  country: string;
  flagUrl: string;
};

function CountryCard({ country, flagUrl }: CardProps) {
  return (
    <div className="flex ">
      {/* <div>
        <img src={flagUrl} alt={`${country} flag`} className="" />
      </div> */}
      <div
        className="w-full h-60 p-4 bg-cover bg-center rounded-lg m-2 flex items-center justify-center"
        style={{ backgroundImage: `url(${flagUrl})` }}
      >
        <h2 className="text-xl font-bold text-black text-center bg-white p-2 rounded">
          {country}
        </h2>
      </div>
    </div>
  );
}

export default CountryCard;
