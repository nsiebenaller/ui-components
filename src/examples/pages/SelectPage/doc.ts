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
        name: "styledCSSList",
        format: "string",
        required: false,
        description: "CSS to apply to the List component",
    },
    {
        name: "label",
        format: "React.ReactNode",
        required: false,
        description: "Label to display above the input",
    },
    {
        name: "children",
        format: "React.ReactNode",
        required: false,
        description: "What to render in the popup dropdown list",
    },
    {
        name: "disabled",
        format: "boolean",
        required: false,
        description: "Flag to disable this input",
    },
    {
        name: "value",
        format: "string",
        required: false,
        description: "Value to display in the input while the list is not open",
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
        description: "Closes the option list when an option is clicked",
    },
    {
        name: "onToggle",
        format: "Function",
        required: false,
        description:
            "Callback function called when the dropdown list is toggled",
    },
    {
        name: "open",
        format: "boolean",
        required: false,
        description: "Forced state of open",
    },
    {
        name: "placholder",
        format: "string",
        required: false,
        description: "Placeholder to display in the input",
    },
    {
        name: "onInput",
        format: "Function",
        required: false,
        description: "Callback function to call when input is changed",
    },
    {
        name: "allowInput",
        format: "boolean",
        required: false,
        description:
            "Allows input to be entered in the input & allows use of 'onInput' prop",
    },
    {
        name: "noWrap",
        format: "boolean",
        required: false,
        description: "Disables constrained width of option list",
    },
];
