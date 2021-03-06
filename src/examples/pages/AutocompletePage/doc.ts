export const properties = [
    {
        name: "options",
        format: "Array<OptionFormat>",
        required: true,
        description: "Options to display that are available to select",
    },
    {
        name: "selected",
        format: "OptionFormat",
        required: false,
        description: "Options to display that are selected",
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description: "Callback function to call when an option is selected",
    },
    {
        name: "centered",
        format: "boolean",
        required: false,
        description: "Centers the options displayed in the list",
    },
    {
        name: "minLength",
        format: "number",
        required: false,
        description: "Minimum length of input string before options appear",
    },
    {
        name: "noMatchText",
        format: "string",
        required: false,
        description:
            "Text to display if there are no matching options (default: 'none')",
    },
];

export const impliedProperties = [
    {
        name: "disabled",
        format: "boolean",
        required: false,
        description: "Flag to disable this input",
    },
    {
        name: "label",
        format: "string",
        required: false,
        description: "Label to display above the input",
    },
    {
        name: "placeholder",
        format: "string",
        required: false,
        description:
            "Text to display in the input when no options are selected",
    },
    {
        name: "error",
        format: "string",
        required: false,
        description: "Error text to display under the input",
    },
    {
        name: "errorOutline",
        format: "boolean",
        required: false,
        description: "Error outline to display around the input",
    },
    {
        name: "noWrap",
        format: "boolean",
        required: false,
        description: "Disables constrained width of option list",
    },
    {
        name: "fullWidth",
        format: "boolean",
        required: false,
        description: "Defines element as block style (width 100%)",
    },
    {
        name: "topPad",
        format: "boolean",
        required: false,
        description:
            "Pads the top of the input (similar to as if a label was defined)",
    },
    {
        name: "botPad",
        format: "boolean",
        required: false,
        description:
            "Pads the bottom of the input (similar to as if an error was defined)",
    },
];

export const codeSample1 = `function Component() {
        const [value, setValue] = React.useState("")

        return(
            <Autocomplete
                label={"Autocomplete"}
                options={["Ant", "Aardvark", "Bear", "Cat", "Dog"]}
                selected={value}
                onChange={(e) => setValue(e)}
            />
        )
    }`;
export const codeSample2 = `function Component() {
    const [value, setValue] = React.useState("")

    return(
        <Autocomplete
            label={"autocomplete full width"}
            error={"error"}
            options={["Ant", "Aardvark", "Bear", "Cat", "Dog"]}
            onChange={(e) => setValue(e)}
            minLength={3}
            fullWidth
            noWrap
        />
    )
}`;
export const codeSample3 = `function Component() {
    const [value, setValue] = React.useState("")

    return(
        <div>
            <Autocomplete
                label={"autocomplete label"}
                selected={value}
                options={[
                    "Ant",
                    "Aardvark",
                    "Very Long animal name that is hard to fit on one line",
                ]}
                onChange={(e) => setValue(e)}
                noWrap
            />
            <button onClick={() => setValue("")}>Clear</button>
        </div>
    )
}`;
export const codeSample4 = `function Component() {
    const [value, setValue] = React.useState("")

    return(
        <Autocomplete
            label={"Autocomplete"}
            selected={value}
            options={["Ant", "Aardvark", "Bear", "Cat", "Dog"]}
            onChange={(e) => setValue(e)}
            noMatchText={"No Matching"}
            centered
        />
    )
}`;
export const codeSample5 = `function Component() {
    const [value, setValue] = React.useState("")

    return(
        <Autocomplete
            label={"autocomplete label"}
            error={"error"}
            options={options}
            onChange={(e: any) => console.log(e)}
            disabled
        />
    )
}`;
