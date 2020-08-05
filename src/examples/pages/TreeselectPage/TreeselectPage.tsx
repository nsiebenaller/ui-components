import React, { useState } from "react";
import { Treeselect } from "../../../package/dist";
import { properties, impliedProperties } from "./doc";
import Documentation from "../../Documentation/Documentation";

const options = [
    {
        value: "Option 1",
        label: "Option 1",
        children: [
            {
                value: "Option 1-1",
                selectable: true,
            },
            {
                value: "Option 1-2",
                children: [
                    {
                        value: "Option 1-2-1",
                        selectable: true,
                    },
                    {
                        value: "Option 1-2-2",
                        selectable: true,
                    },
                ],
            },
        ],
    },
    {
        value: "Option 2",
        label: "Option 2",
        children: [
            {
                value: "Option 2-1",
                selectable: true,
            },
            {
                value: "Option 2-2",
                children: [
                    {
                        value: "Option 2-2-1",
                        selectable: true,
                    },
                    {
                        value: "Option 2-2-2",
                        selectable: true,
                    },
                ],
            },
        ],
    },
    {
        value: "Option 3",
        label: "Option 3",
        children: [],
    },
];

function TreeselectPage() {
    const [selected, setSelected] = useState(undefined);

    return (
        <div>
            <h1>Treeselect Component</h1>
            <Treeselect
                label={"Tree Select Component"}
                error={"Error!"}
                options={options}
                selected={selected}
                onChange={(e: any) => setSelected(e)}
            />
            <br />
            <Treeselect
                label={"Tree Select Component"}
                error={"Error!"}
                options={options}
                selected={selected}
                onChange={(e: any) => setSelected(e)}
            />
            <Documentation title={"Properties"} properties={properties} />
            <Documentation
                title={"Implied Properties"}
                properties={impliedProperties}
            />
        </div>
    );
}
TreeselectPage.pageName = "Treeselect";
export default TreeselectPage;
