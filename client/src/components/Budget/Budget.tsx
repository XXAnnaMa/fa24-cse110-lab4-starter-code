import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [text, setText] = useState(budget.toString());
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const loadBudget = async () => {
      try {
        const fetchedBudget = await fetchBudget();
        setBudget(fetchedBudget);
        setText(fetchedBudget.toString());
      } catch (err: any) {
        console.log(err.message);
      }
    };
    loadBudget();
  }, [setBudget]);

  const handleSaveClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newBudget = parseInt(text);
    if (!isNaN(newBudget)) {
      try {
        await updateBudget(newBudget);
        setBudget(newBudget);
        setIsEditing(false);
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div>
          <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSaveClick} className="btn btn-primary mt-3">Save</button>
        </div>
      ) : (
        <div>
          Budget: ${budget}
          <button onClick={() => setIsEditing(true)} className="btn btn-primary mt-3">Edit</button>
        </div>
      )}
    </div>
  );
};

export default Budget;
