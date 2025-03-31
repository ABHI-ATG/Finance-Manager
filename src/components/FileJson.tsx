import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setParsedData } from "../redux/financeSlice";
import "../css/FileJson.css"; // Import the CSS file

const FileReaderComponent = () => {
    const dispatch = useDispatch();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            const data = parseFileContent(text);
            dispatch(setParsedData(data));
        };
        reader.readAsText(file);
    };

    const parseFileContent = (content) => {
        const lines = content.split("\n").map(line => line.trim());
        const data = [];
        let currentMonthYear = "";
        let currentCategory = "";

        lines.forEach(line => {
            if (line.includes(":")) {
                currentMonthYear = line.replace(":", "").trim();
                data.push({ monthYear: currentMonthYear, categories: {} });
            } else if (line.endsWith("-")) {
                currentCategory = line.replace("-", "").trim();
                data[data.length - 1].categories[currentCategory] = [];
            } else if (line) {
                const parts = line.split(",");
                const entry = { key: parts[0], value: parseFloat(parts[1]) };

                if (parts.length > 2) {
                    entry.description = parts.slice(2).join(", ");
                }

                data[data.length - 1].categories[currentCategory].push(entry);
            }
        });

        return data;
    };

    return (
        <div className="file-upload-container">
            <h2>Upload File</h2>
            <input type="file" accept=".txt" onChange={handleFileUpload} />
        </div>
    );
};

export default FileReaderComponent;
