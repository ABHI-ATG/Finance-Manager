import { useSelector } from "react-redux";
import "../css/CheckStatement.css";

const CheckStatement = () => {
  const startDate = useSelector((state) => state.finance.startDate);
  const endDate = useSelector((state) => state.finance.endDate);
  const parsedData = useSelector((state) => state.finance.parsedData);

  const validDate = (dateString) => {
    const [month, year] = dateString.split(" ");
    const getDateObject = (month, year) => new Date(`${month} 1, ${year}`);
    const start = getDateObject(startDate.month, startDate.year);
    const end = getDateObject(endDate.month, endDate.year);
    const current = getDateObject(month, year);
    return current >= start && current <= end;
  };

  return (
    <div className="statement-container">
      <h2 className="statement-header">Financial Statements</h2>
      {parsedData
        .filter((item) => validDate(item.monthYear))
        .map((entry, index) => (
          <div key={index} className="statement-entry">
            <h3>Statement of {entry.monthYear}</h3>
            {Object.keys(entry.categories).map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="statement-category">{category}</h4>
                {entry.categories[category].map((val, i) => (
                  <div key={i} className="statement-item">
                    <p>
                      <strong>{val.key}</strong>
                    </p>
                    <p>Value: {val.value}</p>
                    {val.description && <p>Description: {val.description}</p>}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default CheckStatement;
