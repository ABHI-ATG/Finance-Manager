import React, { useEffect } from "react";
import months from "../data/month";
import years from "../data/year";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAddDate } from "../redux/financeSlice";

const AddHome = () => {
  const navigate = useNavigate();
  const addDate = useSelector((state) => state.finance.addDate);
  const dispatch = useDispatch();

  const handleDateChange = (e, type) => {
    dispatch(setAddDate({ ...addDate, [type]: e.target.value }));
  };

  useEffect(() => {
    dispatch(setAddDate({ month: "", year: "" }));
  }, [dispatch]);

  return (
    <div className="add-home-container">
      <h2 className="add-home-title">Add Statement:</h2>
      <label className="add-home-label">Date:</label>
      <select
        className="add-home-select"
        onChange={(e) => handleDateChange(e, "month")}
      >
        <option value="">Select Month</option>
        {months.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        className="add-home-select"
        onChange={(e) => handleDateChange(e, "year")}
      >
        <option value="">Select Year</option>
        {years.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <br />
      <button
        className="add-home-button"
        onClick={() => {
          addDate.month === "" || addDate.year === ""
            ? alert("Select Date and Month")
            : navigate("/add");
        }}
      >
        Add
      </button>
    </div>
  );
};

export default AddHome;
