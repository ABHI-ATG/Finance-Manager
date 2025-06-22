import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../css/JsonFile.css"; // Import CSS

const FileReaderComponent = () => {
  const parsedData = useSelector((state) => state.finance.parsedData);

  const convertJsonToFileFormat = (jsonData) => {
    let fileContent = "";
    console.log(jsonData);

    jsonData.forEach((monthData) => {
      console.log(monthData);
      fileContent += `${monthData.monthYear} :\n`;

      Object.keys(monthData["categories"]).forEach((category) => {
        if (Array.isArray(monthData["categories"][category])) {
          fileContent += `${category} -\n`;
          monthData["categories"][category].forEach((entry) => {
            let line = `${entry.key},${entry.value},${entry.description}`;
            fileContent += `${line}\n`;
          });
        }
      });
      fileContent += "\n";
    });

    return fileContent;
  };

  useEffect(() => {
    console.log(parsedData);
  }, [parsedData]);

  const downloadFile = () => {
    const fileContent = convertJsonToFileFormat(parsedData);
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "finance_data.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="file-reader-container">
      <h2 className="file-reader-title">Download File</h2>
      <button className="file-reader-button" onClick={downloadFile}>
        Download Finance Data
      </button>
    </div>
  );
};

export default FileReaderComponent;
