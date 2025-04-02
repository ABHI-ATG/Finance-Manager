import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/GetInsights.css";

const GetInsights = () => {
  const categories = ["Credit","Expenses", "Credit Card", "Investment", "Repay", "Owe"];
  const startDate = useSelector((state) => state.finance.getStartDate);
  const endDate = useSelector((state) => state.finance.getEndDate);
  const parsedData = useSelector((state) => state.finance.parsedData);

  const [data, setData] = useState({});
  const [summary, setSummary] = useState({
    creditAmount:0,
    expenses: 0,
    investment: 0,
    futureSpend: 0,
    futureReceive: 0,
  });

  const validDate = (dateString) => {
    const [month, year] = dateString.split(" ");
    const getDateObject = (month, year) => new Date(`${month} 1, ${year}`);
    const start = getDateObject(startDate.month, startDate.year);
    const end = getDateObject(endDate.month, endDate.year);
    const current = getDateObject(month, year);
    return current >= start && current <= end;
  };

  useEffect(() => {
    let newData = {};
    let expenses = 0,
      investment = 0,
      futureSpend = 0,
      futureReceive = 0,
      creditAmount=0;

    parsedData
      .filter((item) => validDate(item.monthYear))
      .forEach((entry) => {
        Object.keys(entry.categories).forEach((key) => {
          entry.categories[key].forEach((val) => {
            if (!newData[key]) {
              newData[key] = [];
            }

            let index = newData[key].findIndex(
              (item) => Object.keys(item)[0] === val.key
            );
            if (index === -1) {
              newData[key].push({
                [val.key]: {
                  expenditure: parseFloat(val.value),
                  description: val.description ? val.description : "",
                },
              });
            } else {
              newData[key][index][val.key]["expenditure"] += parseFloat(
                val.value
              );
              newData[key][index][val.key]["description"] += val.description
                ? ", " + val.description
                : "";
            }
            if(key === 'Credit')creditAmount+=parseFloat(val.value)
            if (key === "Expenses" || key === "Credit Card")
              expenses += parseFloat(val.value);
            if (key === "Investment") investment += parseFloat(val.value);
            if (key === "Repay" || key === "Credit Card")
              futureSpend += parseFloat(val.value);
            if (key === "Owe") futureReceive += parseFloat(val.value);
          });
        });
      });

    setData(newData);
    setSummary({ creditAmount, expenses, investment, futureSpend, futureReceive });
  }, [parsedData, startDate, endDate]);

  return (
    <div className="insights-container">
      <h2>Financial Insights</h2>
      {Object.keys(data || {}).map((category) => (
        <div key={category} className="insight-category">
          <h3>{category}</h3>
          {data[category]?.map((item, index) => {
            const [key, value] = Object.entries(item)[0];
            return (
              <div key={index} className="insight-item">
                <p>
                  <strong>{key}:</strong> {value.expenditure.toFixed(2)}
                </p>
                {value.description && <p>Description: {value.description}</p>}
              </div>
            );
          })}
        </div>
      ))}

      <div className="summary-section">
        <h3>Summary</h3>
        <p>
          <strong>Total Credit Amount:</strong> {summary.creditAmount.toFixed(2)}
        </p>
        <p>
          <strong>Total Expenses:</strong> {summary.expenses.toFixed(2)}
        </p>
        <p>
          <strong>Total Investment:</strong> {summary.investment.toFixed(2)}
        </p>
        <p>
          <strong>Future Spend:</strong> {summary.futureSpend.toFixed(2)}
        </p>
        <p>
          <strong>Future Receive:</strong> {summary.futureReceive.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default GetInsights;
