import React, { useState } from "react";
import { Multiselect } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

const options = [
    {
        value: "Option 1",
        label: "Option 1",
    },
    {
        value: "Option 2",
        label: "Option 2",
    },
    {
        value: "Option 3",
        label: "Option 3",
    },
];

function MultiselectPage() {
    const [selected, setSelected] = useState([]);
    const [allSelected, setAllSelected] = useState([]);

    return (
        <div>
            <h1>Multiselect Component</h1>
            <h4>Basic Multiselect</h4>
            <Multiselect
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                onChange={(e: any) => setSelected(e)}
            />
            <h4>Multiselect Errors</h4>
            <Multiselect
                label={"Multiselect"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                onChange={(e: any) => setSelected(e)}
                errorOutline
            />
            <Multiselect
                label={"Multiselect"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                onChange={(e: any) => setSelected(e)}
                errorOutline
                botPad
            />
            <Multiselect
                label={"Multiselect"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                onChange={(e: any) => setSelected(e)}
            />
            <h4>Full-Width Multiselect</h4>
            <Multiselect
                label={"Full-Width"}
                options={options}
                selected={allSelected}
                placeholder={"placeholder"}
                rolloverLimit={2}
                fullWidth
                onChange={(e: any) => setAllSelected(e)}
            />
            <h4>Multiselect with an 'All' option</h4>
            <Multiselect
                label={"With All Value"}
                options={options}
                selected={allSelected}
                placeholder={"All"}
                rolloverLimit={2}
                includeAll
                onChange={(e: any) => setAllSelected(e)}
            />
            <Multiselect
                label={"Sticky All Value"}
                options={options}
                selected={allSelected}
                placeholder={"All"}
                rolloverLimit={2}
                includeAll
                stickyAll
                allText={"All Programs"}
                onChange={(e: any) => setAllSelected(e)}
            />
            <br />
            <h4>Rollover Limit</h4>
            <Multiselect
                label={"Rollover Limit 1"}
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selected={selected}
                placeholder={"Select Report"}
                rolloverLimit={1}
                onChange={(e: any) => setSelected(e)}
            />
            <br />
            <h4>Fill Selected</h4>
            <Multiselect
                label={"fill selected"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                onChange={(e: any) => setSelected(e)}
                fillSelected
            />
            <br />
            <h4>Disabled</h4>
            <Multiselect
                label={"disabled"}
                error={"error"}
                options={["Option 1", "Option 2", "Option 3"]}
                selected={["Option 1"]}
                disabled
            />
            <Multiselect
                label={"disabled with error outline"}
                error={"error"}
                errorOutline
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
MultiselectPage.pageName = "Multiselect";
export default MultiselectPage;
