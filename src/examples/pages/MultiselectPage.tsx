import React, { useState } from "react";
import { Multiselect } from "../../package/dist";

export default function MultiselectPage() {

  const [selected, setSelected] = useState([])

  return (
    <div>
      <h1>Multiselect Component</h1>
      <Multiselect
        label={"multiselect label"}
        error={"error"}
        options={["Option 1", "Option 2", "Option 3"]}
        selected={selected}
        placholder={"Select Report"}
        rolloverLimit={2}
        onChange={(e: any) => setSelected(e)}
      />
      <Multiselect
        label={"fill selected"}
        options={["Option 1", "Option 2", "Option 3"]}
        selected={["Option 1"]}
        onChange={(e: any) => console.log(e)}
        fillSelected
      />
      <Multiselect
        label={"multiselect label"}
        error={"error"}
        errorOutline
        options={["Option 1", "Option 2", "Option 3"]}
        selected={["Option 1"]}
        disabled
      />
    </div>
  );
}
