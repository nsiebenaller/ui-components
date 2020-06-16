import React from "react";
import { TextArea } from "../../package/dist";

export default function TextAreaPage() {
  return (
    <div>
      <h1>TextArea Component</h1>
      <TextArea label={"TextArea label"} value={"hello world"} error={"error"} onChange={console.log} />
      <br />
      <TextArea label={"TextArea label"} value={"disabled"} error={"error"} disabled noResize  />
      <br />
      <TextArea label={"TextArea label"} value={"extra long text for a text area is A-Okay here, the text area should expand to fit the text"} error={"error"} />
    </div>
  );
}

///resize: none;
