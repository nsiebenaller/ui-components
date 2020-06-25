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
];
