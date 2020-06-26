import React, { useState } from "react";
import { Multiselect } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function MultiselectPage() {
    const [selected, setSelected] = useState([]);
    const [allSelected, setAllSelected] = useState([]);

    return (
        <div>
            <h1>Multiselect Component</h1>
            <Multiselect
                label={"sticky all value"}
                error={"error text"}
                options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 11",
                    "Option 22",
                    "Option 33",
                ]}
                selected={allSelected}
                placholder={"All"}
                rolloverLimit={2}
                includeAll
                stickyAll
                allText={"All Programs"}
                onChange={(e: any) => setAllSelected(e)}
            />
            <Multiselect
                label={"multiselect with all value"}
                error={"error text"}
                options={[
                    "Option 1",
                    "Option 2",
                    "Option 3",
                    "Option 11",
                    "Option 22",
                    "Option 33",
                ]}
                selected={allSelected}
                placholder={"All"}
                rolloverLimit={2}
                includeAll
                onChange={(e: any) => setAllSelected(e)}
            />
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
                label={"disabled with error outline"}
                error={"error"}
                errorOutline
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                disabled
            />
            <Multiselect
                label={"multiselect disabled"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
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
