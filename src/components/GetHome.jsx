import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGetStartDate, setGetEndDate } from "../redux/financeSlice";
import months from "../data/month";
import years from "../data/year";
import { useEffect, useState } from "react";

const GetHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disable, setDisabled] = useState(false);
  const startDate = useSelector((state) => state.finance.getStartDate);
  const endDate = useSelector((state) => state.finance.getEndDate);

  const handleStartDateChange = (e, type) => {
    dispatch(setGetStartDate({ ...startDate, [type]: e.target.value }));
  };

  const handleEndDateChange = (e, type) => {
    dispatch(setGetEndDate({ ...endDate, [type]: e.target.value }));
  };

  useEffect(() => {
    if (disable) {
      dispatch(setGetStartDate({ month: "January", year: "1975" }));
    }
  }, [disable, dispatch]);

  return (
    <div className="get-home-container">
      <h2 className="get-home-title">Get Insights:</h2>

      <label className="get-home-label">Start Date:</label>
      <select
        className="get-home-select"
        disabled={disable}
        value={startDate.month}
        onChange={(e) => handleStartDateChange(e, "month")}
      >
        <option value="">Select Month</option>
        {months.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="get-home-select"
        disabled={disable}
        value={startDate.year}
        onChange={(e) => handleStartDateChange(e, "year")}
      >
        <option value="">Select Year</option>
        {years.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="get-home-label">
        <input
          className="get-home-checkbox"
          type="checkbox"
          checked={disable}
          onChange={(e) => setDisabled(e.target.checked)}
        />
        From Starting
      </label>

      <label className="get-home-label">End Date:</label>
      <select
        className="get-home-select"
        value={endDate.month}
        onChange={(e) => handleEndDateChange(e, "month")}
      >
        <option value="">Select Month</option>
        {months.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="get-home-select"
        value={endDate.year}
        onChange={(e) => handleEndDateChange(e, "year")}
      >
        <option value="">Select Year</option>
        {years.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button className="get-home-button" onClick={() => navigate("/get")}>
        Check
      </button>
    </div>
  );
};

export default GetHome;
