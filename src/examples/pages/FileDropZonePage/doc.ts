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
        name: "children",
        format: "React.ReactNode",
        required: false,
        description: "HTML to display within the drop zone",
    },
    {
        name: "cursorPointer",
        format: "boolean",
        required: false,
        description: "Changes the cursor to pointer",
    },
    {
        name: "color",
        format: "string",
        required: false,
        description: "Color to use for the background (default: white)",
    },
    {
        name: "hoverColor",
        format: "string",
        required: false,
        description: "Color to use for the hovered background (default: white)",
    },
    {
        name: "multiple",
        format: "boolean",
        required: false,
        description: "Allow multiple files to be selected (default: false)",
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description: "Callback function when files are selected",
    },
];
