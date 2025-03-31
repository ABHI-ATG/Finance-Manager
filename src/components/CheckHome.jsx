import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate, setEndDate } from "../redux/financeSlice";
import months from "../data/month";
import years from "../data/year";
import "../css/CheckHome.css";

const CheckHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const startDate = useSelector((state) => state.finance.startDate);
  const endDate = useSelector((state) => state.finance.endDate);

  const handleStartDateChange = (e, type) => {
    dispatch(setStartDate({ ...startDate, [type]: e.target.value }));
  };

  const handleEndDateChange = (e, type) => {
    dispatch(setEndDate({ ...endDate, [type]: e.target.value }));
  };

  return (
    <div className="check-home-container">
      <h2 className="check-home-title">Check Statement:</h2>

      <label className="check-home-label">Start Date:</label>
      <select
        className="check-home-select"
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
        className="check-home-select"
        onChange={(e) => handleStartDateChange(e, "year")}
      >
        <option value="">Select Year</option>
        {years.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <label className="check-home-label">End Date:</label>
      <select
        className="check-home-select"
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
        className="check-home-select"
        onChange={(e) => handleEndDateChange(e, "year")}
      >
        <option value="">Select Year</option>
        {years.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      <button className="check-home-button" onClick={() => navigate("/check")}>
        Check
      </button>
    </div>
  );
};

export default CheckHome;
