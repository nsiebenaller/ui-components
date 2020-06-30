import React from "react";
import { Autocomplete } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function AutocompletePage() {
    return (
        <div>
            <h1>Autocomplete Component</h1>
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
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={[
                    "Ant",
                    "Aardvark",
                    "Very Long animal name that is hard to fit on one line",
                ]}
                onChange={(e: any) => console.log(e)}
                noWrap
            />
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={["Ant", "Aardvark", "Duck"]}
                onChange={(e: any) => console.log(e)}
                noMatchText={"No Matching"}
                centered
            />
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
