import React from "react";
import { Button, TextField } from "../../package/dist";

export default function ButtonPage() {
  return (
    <div>
      <h1>Button Component</h1>

      {/* <TextField /> */}
      <Button 
        color={"blue"}
        colorHue={"900"}
        botPad 
        topPad
      >Dark Button</Button>

      <Button 
        color={"red"}
        colorHue={"700"}
        botPad 
        topPad
      >Light Button</Button>

      <Button 
        color={"indigo"}
        botPad 
        topPad
      >Indigo</Button>

      <Button 
        color={"blue"}
        colorHue={"700"}
        variant={"outlined"}
        botPad 
        topPad
      >Indigo</Button>
      
    </div>
  );
}
