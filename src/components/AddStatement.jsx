import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddKey, setParsedData } from "../redux/financeSlice";
import { useNavigate } from "react-router-dom";
import "../css/AddStatement.css"; 

const AddStatement = () => {
  const categories = ["Credit","Expenses", "Credit Card", "Investment", "Repay", "Owe"];

  const addDate = useSelector((state) => state.finance.addDate);
  const key = useSelector((state) => state.finance.key);
  const parsedData = useSelector((state) => state.finance.parsedData);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const selectedMonth = `${addDate.month} ${addDate.year}`;

    const matchingEntry = parsedData.find(
      (item) => item.monthYear === selectedMonth
    );

    if (matchingEntry) {
      setData(matchingEntry.categories);
    } else {
      setData({
        Expenses: [],
        "Credit Card": [],
        Investment: [],
        Repay: [],
        Owe: [],
        Credit : []
      });
    }
  }, [parsedData, addDate]);

  const handleInputChange = (category, index, field, value) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleRemove = (category, index) => {
    setData((prevData) => ({
      ...prevData,
      [category]: prevData[category].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = () => {
    // Deep copy `data` to prevent unintended mutations
    let updatedData = JSON.parse(JSON.stringify(data));

    Object.values(updatedData).forEach((categoryEntries) => {
        categoryEntries.forEach((item) => {
            item.key = item.key.trim();
            dispatch(setAddKey(item.key)); // Only dispatch once per key
        });
    });

    const selectedMonth = `${addDate.month} ${addDate.year}`;

    let updatedParsedData = parsedData.map((item) =>
        item.monthYear === selectedMonth
            ? { ...item, categories: updatedData }
            : item
    );

    if (!parsedData.find((item) => item.monthYear === selectedMonth)) {
        updatedParsedData.push({
            monthYear: selectedMonth,
            categories: updatedData,
        });
    }

    dispatch(setParsedData(updatedParsedData));
    navigate("/");
};


  return (
    <div className="add-statement-container">
      <h2 className="add-statement-header">
        Add Statement for {addDate.month} {addDate.year}
      </h2>
      {console.log(key)}

      {categories.map((category, i) => (
        <div key={i} className="category-section">
          <h3 className="category-title">{category}</h3>

          {(data[category] || []).map((item, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                list="suggestions"
                placeholder="Enter Category"
                value={item.key}
                onChange={(e) =>
                  handleInputChange(category, index, "key", e.target.value)
                }
              />
              <datalist id="suggestions">
                {key.map((option, i) => (
                  <option key={i} value={option} />
                ))}
              </datalist>

              <input
                type="text"
                placeholder="Enter Value"
                value={item.value}
                onChange={(e) =>
                  handleInputChange(category, index, "value", e.target.value)
                }
              />

              {(category === "Expenses" || category === "Credit Card") && (
                <input
                  type="text"
                  placeholder="Enter Description"
                  value={item.description || ""}
                  onChange={(e) =>
                    handleInputChange(
                      category,
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />
              )}

              <button
                className="remove-btn"
                onClick={() => handleRemove(category, index)}
              >
                ❌
              </button>
            </div>
          ))}

          <button
            className="add-btn"
            onClick={() =>
              setData((prevData) => ({
                ...prevData,
                [category]: [
                  ...(prevData[category] || []),
                  { key: "", value: "", description: "" },
                ],
              }))
            }
          >
            Add
          </button>
        </div>
      ))}

      <button className="submit-btn" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default AddStatement;
