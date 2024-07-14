import { useNavigate } from "react-router-dom";

function Section1() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/form");
  }
  return (
    <div>
      <button onClick={handleClick}>Form</button>{" "}
    </div>
  );
}

export default Section1;
