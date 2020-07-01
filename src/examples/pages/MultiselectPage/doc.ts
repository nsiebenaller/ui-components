export const properties = [
    {
        name: "options",
        format: "Array<OptionFormat>",
        required: true,
        description: "Options to display that are available to select",
    },
    {
        name: "selected",
        format: "Array<OptionFormat>",
        required: true,
        description: "Options to display that are currently selected",
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
        name: "fillSelected",
        format: "boolean",
        required: false,
        description:
            "Selected input will recieve a background (similar to the Dropdown component)",
    },
    {
        name: "rolloverLimit",
        format: "number",
        required: false,
        description:
            "Sets the maximum number of options to be displayed. comma deliminated before the abbreviated text is displayed",
    },
    {
        name: "includeAll",
        format: "boolean",
        required: false,
        description:
            "Includes an option called 'Select All' which will return all given options",
    },
    {
        name: "allText",
        format: "string",
        required: false,
        description: "Overwrites the default text for 'includeAll' property",
    },
    {
        name: "stickyAll",
        format: "boolean",
        required: false,
        description: "Makes the 'All' all option sticky",
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
        name: "value",
        format: "string",
        required: false,
        description: "Overrides the value displayed in the input",
    },
];
