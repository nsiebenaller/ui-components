import React, { useState } from "react";
import { CodeBlock, dracula } from "react-code-blocks";
import { Autocomplete } from "../../../package/dist";
import {
    properties,
    impliedProperties,
    codeSample1,
    codeSample2,
    codeSample3,
    codeSample4,
    codeSample5,
} from "./doc";
import Documentation from "../../Documentation/Documentation";
import Code from "../../Code/Code";

const options = ["Ant", "Aardvark", "Bear", "Cat", "Dog"];
function AutocompletePage() {
    const [openId, setOpenId] = React.useState<number>(-1);
    const toggleVisibility = (id: number) => {
        if (id === openId) {
            setOpenId(-1);
        } else {
            setOpenId(id);
        }
    };

    const [value, setValue] = useState<string>("");
    const handleValue = (e: any) => setValue(e);

    return (
        <div>
            <h1>Autocomplete Component</h1>
            <h4>Basic Autocomplete</h4>
            <Autocomplete
                label={"Autocomplete"}
                options={options}
                selected={value}
                onChange={handleValue}
            />
            <Code
                text={codeSample1}
                openId={openId}
                toggleVisibility={toggleVisibility}
            />
            <h4>Full Width Autocomplete</h4>
            <Autocomplete
                label={"autocomplete full width"}
                error={"error"}
                options={options}
                onChange={handleValue}
                minLength={3}
                fullWidth
                noWrap
            />
            <Code
                text={codeSample2}
                openId={openId}
                toggleVisibility={toggleVisibility}
            />
            <h4>Clearing Autocomplete</h4>
            <Autocomplete
                label={"Clearable Autocomplete"}
                selected={value}
                options={[
                    "Ant",
                    "Aardvark",
                    "Very Long animal name that is hard to fit on one line",
                ]}
                onChange={handleValue}
                noWrap
            />
            <button onClick={() => setValue("")}>Clear</button>
            <Code
                text={codeSample3}
                openId={openId}
                toggleVisibility={toggleVisibility}
            />
            <h4>Custom 'no-match' Text</h4>
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={options}
                onChange={(e: any) => console.log(e)}
                noMatchText={"No Matching"}
                centered
            />
            <Code
                text={codeSample4}
                openId={openId}
                toggleVisibility={toggleVisibility}
            />
            <h4>Disabled Autocomplete</h4>
            <Autocomplete
                label={"autocomplete label"}
                error={"error"}
                options={options}
                onChange={(e: any) => console.log(e)}
                disabled
            />
            <Code
                text={codeSample5}
                openId={openId}
                toggleVisibility={toggleVisibility}
            />
            <Documentation title={"Properties"} properties={properties} />
            <Documentation
                title={"Implied Properties"}
                properties={impliedProperties}
            />
        </div>
    );
}
AutocompletePage.pageName = "Autocomplete";
export default AutocompletePage;
