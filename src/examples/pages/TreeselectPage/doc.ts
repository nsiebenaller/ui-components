export const properties = [
    {
        name: "options",
        format: "Array<TreeOptionType>",
        required: true,
        description: "Options to display that are available to select",
    },
    {
        name: "selected",
        format: "TreeOptionType",
        required: false,
        description: "Option to display that is selected",
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
        name: "fullWidth",
        format: "boolean",
        required: false,
        description: "Defines element as block style (width 100%)",
    },
    {
        name: "value",
        format: "string",
        required: false,
        description: "Overrides the value displayed in the input",
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
