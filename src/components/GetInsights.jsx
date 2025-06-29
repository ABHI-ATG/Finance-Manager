import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GetInsights = () => {
  const categories = [
    "Credit",
    "Expenses",
    "Credit Card",
    "Investment",
    "Repay",
    "Owe",
  ];
  const startDate = useSelector((state) => state.finance.getStartDate);
  const endDate = useSelector((state) => state.finance.getEndDate);
  const parsedData = useSelector((state) => state.finance.parsedData);

  const [data, setData] = useState({});
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const [summary, setSummary] = useState({
    creditAmount: 0,
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
      creditAmount = 0;

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
                  description: val.description
                    ? [{ [val.description]: parseFloat(val.value) }]
                    : [],
                },
              });
            } else {
              newData[key][index][val.key]["expenditure"] += parseFloat(
                val.value
              );
              let descriptionArray =
                newData[key][index][val.key]["description"];
              let descIndex = descriptionArray.findIndex(
                (descObj) => Object.keys(descObj)[0] === val.description
              );
              if (descIndex === -1) {
                descriptionArray.push({
                  [val.description]: parseFloat(val.value),
                });
              } else {
                let existingKey = Object.keys(descriptionArray[descIndex])[0];
                descriptionArray[descIndex][existingKey] += parseFloat(
                  val.value
                );
              }
            }

            if (key === "Credit") creditAmount += parseFloat(val.value);
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
    setSummary({
      creditAmount,
      expenses,
      investment,
      futureSpend,
      futureReceive,
    });
  }, [parsedData, startDate, endDate]);

  const toggleDescription = (category, index) => {
    const key = `${category}-${index}`;
    setVisibleDescriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="insights-container">
      <h2>Financial Insights</h2>
      {Object.keys(data || {}).map((category) => (
        <div key={category} className="insight-category">
          <h3>{category}</h3>
          {data[category]?.map((item, index) => {
            const [key, value] = Object.entries(item)[0];
            const descriptionKey = `${category}-${index}`;
            return (
              <div key={index} className="insight-item">
                <p>
                  <strong>{key}:</strong> {value.expenditure.toFixed(2)}
                </p>
                {value.description.length > 0 && (
                  <button onClick={() => toggleDescription(category, index)}>
                    {visibleDescriptions[descriptionKey]
                      ? "Hide Description"
                      : "Show Description"}
                  </button>
                )}
                {visibleDescriptions[descriptionKey] &&
                  value.description.map((entry, i) => {
                    const descKey = Object.keys(entry)[0];
                    const descValue = Object.values(entry)[0];
                    return (
                      <p key={i}>
                        <strong>{descKey}:</strong> {descValue.toFixed(2)}
                      </p>
                    );
                  })}
              </div>
            );
          })}
        </div>
      ))}

      <div className="summary-section">
        <h3>Summary</h3>
        <p>
          <strong>Total Credit Amount:</strong>{" "}
          {summary.creditAmount.toFixed(2)}
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
