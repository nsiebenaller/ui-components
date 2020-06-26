export const properties = [
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
        name: "value",
        format: "string",
        required: false,
        description: "Text to be displayed in the text area",
    },
    {
        name: "cols",
        format: "number",
        required: false,
        description: "Specifies the visible width of a text area",
    },
    {
        name: "rows",
        format: "number",
        required: false,
        description: "Specifies the visible number of lines in a text area",
    },
    {
        name: "label",
        format: "React.ReactNode",
        required: false,
        description: "Label to display above the input",
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
    {
        name: "noResize",
        format: "boolean",
        required: false,
        description: "Flag to prevent resizing of the input",
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description: "Callback function to run when input has changed",
    },
];
