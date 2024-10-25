import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Budget = () => {
  const context = useContext(AppContext);

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>Budget: $1000</div>
    </div>
  );
};

export default Budget;
