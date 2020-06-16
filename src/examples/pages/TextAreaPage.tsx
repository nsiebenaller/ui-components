import React from "react";
import { TextArea } from "../../package/dist";

export default function TextAreaPage() {
  return (
    <div>
      <h1>TextArea Component</h1>
      <TextArea
        label={"TextArea label"}
        value={"hello world"}
        error={"error"}
      />
      <br />
      <TextArea
        label={"TextArea label"}
        value={"disabled"}
        disabled
        error={"error"}
      />
    </div>
  );
}
