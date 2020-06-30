export const properties = [
    {
        name: "value",
        format: "string",
        required: false,
        description: "Current value of the input",
    },
    {
        name: "className",
        format: "string",
        required: false,
        description: "Class to apply to the component",
    },
    {
        name: "id",
        format: "string",
        required: false,
        description: "ID to apply to the component",
    },
    {
        name: "placeholder",
        format: "string",
        required: false,
        description: "Placeholder text to display",
    },
    {
        name: "label",
        format: "React.ReactNode",
        required: false,
        description: "Label to display above the input",
    },
    {
        name: "fullWidth",
        format: "boolean",
        required: false,
        description: "Defines element as block style (width 100%)",
    },
    {
        name: "type",
        format: `"password" | "number" | "text"`,
        required: false,
        description: `Defines the input as a certain type (number, password) Default: "text"`,
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description: "Function to call when input changes",
    },
    {
        name: "onEnter",
        format: "Function",
        required: false,
        description: "Function to call when enter is pressed",
    },
    {
        name: "error",
        format: "string",
        required: false,
        description: "Error text to display under the input",
    },
    {
        name: "disabled",
        format: "boolean",
        required: false,
        description: "Flag to disable this input",
    },
];
