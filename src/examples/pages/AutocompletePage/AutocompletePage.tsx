import React, { useState } from "react";
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
import Example from "../../Example/Example";

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
            <h2>Basic Autocomplete</h2>
            <p>
                Autocompletes are components that give users the option of
                completing words or forms by a shorthand method on the basis of
                what has been typed before. This component accepts a list of
                options that are available for selection by this input.
            </p>
            <Example>
                <Autocomplete
                    label={"Autocomplete"}
                    options={options}
                    selected={value}
                    onChange={handleValue}
                />
            </Example>
            <Code text={codeSample1} />
            <h2>Full Width Autocomplete</h2>
            <p>
                This component can be set to full-width, taking up all available
                horizontal space.
            </p>
            <Example>
                <Autocomplete
                    label={"autocomplete full width"}
                    error={"error"}
                    options={options}
                    onChange={handleValue}
                    minLength={3}
                    fullWidth
                    noWrap
                />
            </Example>
            <Code text={codeSample2} />
            <h2>Clearing Autocomplete</h2>
            <p>
                This component will be cleared if the given `selected` prop is
                changed.
            </p>
            <Example>
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
                <span>
                    <button onClick={() => setValue("")}>Clear</button>
                </span>
            </Example>
            <Code text={codeSample3} />
            <h2>Custom 'no-match' Text</h2>
            <p>
                This component supports custom text to be displayed if none of
                the given options match the selected text.
            </p>
            <Example>
                <Autocomplete
                    label={"autocomplete label"}
                    error={"error"}
                    options={options}
                    onChange={(e: any) => console.log(e)}
                    noMatchText={"No Matching"}
                    centered
                />
            </Example>
            <Code text={codeSample4} />
            <h2>Disabled Autocomplete</h2>
            <p>
                This component supports the ability to be disabled, preventing
                any further interaction.
            </p>
            <Example>
                <Autocomplete
                    label={"autocomplete label"}
                    error={"error"}
                    options={options}
                    onChange={(e: any) => console.log(e)}
                    disabled
                />
            </Example>
            <Code text={codeSample5} />
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
