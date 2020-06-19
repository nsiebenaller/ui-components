import React from "react";
import { Dropdown } from "../../../package/dist";

export default function DropdownPage() {
    return (
        <div>
            <h1>Dropdown Component</h1>
            <Dropdown
                label={"dropdown label"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
            />
            <Dropdown
                label={"dropdown label"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
                disabled
            />
            <Dropdown
                label={"No Wrap"}
                error={"error"}
                options={[
                    "Option 1",
                    "Very Long option name that will be too long for one line",
                    "Option 3",
                ]}
                selected={"Option 1"}
                onChange={(e: any) => console.log(e)}
                noWrap
            />
        </div>
    );
}
