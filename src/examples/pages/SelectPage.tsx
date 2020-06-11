import React from "react";
import { Select } from "../../components/index";

export default function SelectPage() {
  return (
    <div>
      <h1>Select Component</h1>
      <Select label={"Label"} value={"2 selected"} error={"error text"}>
        <div>children content here!</div>
      </Select>
      <Select
        label={"Disabled input"}
        value={"Disabled input"}
        error={"disabled"}
        disabled
      >
        <div>Option 1</div>
        <div>Option 2</div>
        <div>Option 3</div>
      </Select>
    </div>
  );
}
