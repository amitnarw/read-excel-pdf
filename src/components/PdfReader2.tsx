"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

function PDFParserReact() {
  const [pdfText, setPdfText] = useState("");
  const [excelData, setExcelData] = useState<any[]>([]);

  function extractTextFromPDF(file: any) {
    const reader: any = new FileReader();
    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;
      let text = "";

      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const content = await page.getTextContent();
        text += content.items.map((item: any) => item.str).join(" ");
      }

      console.log(text);
      setPdfText(text);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          accept="application/pdf"
          onChange={extractTextFromPDF}
        />
      </header>
    </div>
  );
}
export default PDFParserReact;
