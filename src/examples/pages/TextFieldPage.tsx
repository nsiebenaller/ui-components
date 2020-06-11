import React from "react";
import { TextField } from "../../package/dist";

export default function TextFieldPage() {
  return (
    <div>
      <h1>TextField Component</h1>
      <TextField className={"custom class"} value={"Tim"} />
    </div>
  );
}
