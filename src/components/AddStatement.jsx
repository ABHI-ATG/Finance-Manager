import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddKey,
  setAddDescriptionKey,
  setParsedData,
} from "../redux/financeSlice";
import { useNavigate } from "react-router-dom";

const AddStatement = () => {
  const categories = [
    "Credit",
    "Expenses",
    "Credit Card",
    "Investment",
    "Repay",
    "Owe",
  ];
  const addDate = useSelector((state) => state.finance.addDate);
  const keys = useSelector((state) => state.finance.key);
  const descriptionKey = useSelector((state) => state.finance.descriptionKey);
  const parsedData = useSelector((state) => state.finance.parsedData);

  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Correct: useRef for input tracking
  const inputRefs = useRef({});
  const [focusTarget, setFocusTarget] = useState({ category: "", index: -1 });

  useEffect(() => {
    if (focusTarget.category && focusTarget.index >= 0) {
      const key = `${focusTarget.category}-${focusTarget.index}`;
      const inputElement = inputRefs.current[key];
      if (inputElement) {
        inputElement.focus();
        inputElement.select();
      }
      // Reset focusTarget to avoid repeated focusing
      setFocusTarget({ category: "", index: -1 });
    }
  }, [focusTarget]);

  useEffect(() => {
    const selectedMonth = `${addDate.month} ${addDate.year}`;
    const matchingEntry = parsedData.find(
      (item) => item.monthYear === selectedMonth
    );
    if (matchingEntry) {
      setData(matchingEntry.categories);
    } else {
      const emptyCategories = {};
      categories.forEach((cat) => (emptyCategories[cat] = []));
      setData(emptyCategories);
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

  const handleAdd = (category, index) => {
    setData((prevData) => {
      const newData = [...prevData[category]];
      const itemToDuplicate = { ...newData[index] };
      newData.splice(index + 1, 0, itemToDuplicate);
      setFocusTarget({ category, index: index + 1 });
      return { ...prevData, [category]: newData };
    });
  };

  const handleAddEmptyEntry = (category) => {
    setData((prevData) => {
      const newIndex = prevData[category]?.length || 0;
      setFocusTarget({ category, index: newIndex });
      return {
        ...prevData,
        [category]: [
          ...(prevData[category] || []),
          { key: "", value: "", description: "" },
        ],
      };
    });
  };

  const onSubmit = () => {
    let updatedData = JSON.parse(JSON.stringify(data));
    console.log("Updated Data:", updatedData);
    const selectedMonth = `${addDate.month} ${addDate.year}`;

    Object.values(updatedData).forEach((categoryEntries) => {
      categoryEntries.forEach((item) => {
        item.key = item.key.trim();
        dispatch(setAddKey(item.key));
        item.description = item.description ? item.description.trim() : "none";
        dispatch(setAddDescriptionKey(item.description));
      });
    });

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
                {keys.map((option, i) => (
                  <option key={i} value={option} />
                ))}
              </datalist>
              <input
                type="text"
                placeholder="Enter Value"
                value={item.value}
                ref={(el) => {
                  inputRefs.current[`${category}-${index}`] = el;
                }}
                onChange={(e) =>
                  handleInputChange(category, index, "value", e.target.value)
                }
              />
              <input
                type="text"
                list="descriptionSuggestion"
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
              <datalist id="descriptionSuggestion">
                {descriptionKey.map((option, i) => (
                  <option key={i} value={option} />
                ))}
              </datalist>
              <button
                className="remove-btn"
                onClick={() => handleAdd(category, index)}
              >
                +
              </button>
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
            onClick={() => handleAddEmptyEntry(category)}
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
