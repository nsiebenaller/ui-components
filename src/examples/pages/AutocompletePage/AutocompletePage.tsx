import React, { useState } from "react";
import { Autocomplete } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function AutocompletePage() {
    const [value, setValue] = useState("");
    return (
        <div>
            <h1>Autocomplete Component</h1>
            <h4>Full Width Autocomplete</h4>
            <Autocomplete
                label={"autocomplete full width"}
                error={"error"}
                options={[
                    "Ant",
                    "Aardvark",
                    "Very Long animal name that is hard to fit on one line",
                ]}
                onChange={(e: any) => console.log(e)}
                minLength={3}
                fullWidth
                noWrap
            />
            <h4>Clearing Autocomplete</h4>
            <Autocomplete
                label={"autocomplete label"}
                selected={value}
                options={[
                    "Ant",
                    "Aardvark",
                    "Very Long animal name that is hard to fit on one line",
                ]}
                onChange={(e: any) => setValue(e)}
                noWrap
            />
            <button onClick={() => setValue("")}>Clear</button>
            <h4>Custom 'no-match' Text</h4>
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={["Ant", "Aardvark", "Duck"]}
                onChange={(e: any) => console.log(e)}
                noMatchText={"No Matching"}
                centered
            />
            <h4>Disabled Autocomplete</h4>
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={["Jim", "Mike", "Julia"]}
                onChange={(e: any) => console.log(e)}
                disabled
            />
            <Documentation title={"Properties"} properties={properties} />
            <Documentation
                title={"Implied Properties"}
                properties={impliedProperties}
            />
        </div>
    );
}
