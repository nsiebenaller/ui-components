export const properties = [
    {
        name: "value",
        format: "Date",
        required: false,
        description: "Currently selected date",
    },
    {
        name: "label",
        format: "React.ReactNode",
        required: false,
        description: "Label to display above the input",
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description:
            "Callback function to call when the input changes to a valid input",
    },
    {
        name: "includeTime",
        format: "boolean",
        required: false,
        description:
            "Includes time in the input that allows the end user to change",
    },
];
