"use client";

import { useState } from "react";
import pdfToText from "react-pdftotext";
import * as XLSX from "xlsx";

function PDFParserReact() {
  const [pdfText, setPdfText] = useState("");
  const [excelData, setExcelData] = useState<any[]>([]);

  function extractText(event: any) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => {
        console.log(text);
        setPdfText(text);
      })
      .catch((error) => console.error("Failed to extract text from pdf"));
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);
      console.log(json);
      setExcelData(json);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="file" accept="application/pdf" onChange={extractText} />
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </header>
    </div>
  );
}
export default PDFParserReact;
