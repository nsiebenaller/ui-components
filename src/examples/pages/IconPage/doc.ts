export const properties = [
    {
        name: "iconName",
        format: "string",
        required: true,
        description: `Icon to display in Capital-Case (ex: "ArrowDropDown")`,
    },
    {
        name: "className",
        format: "string",
        required: false,
        description: `Class to apply to the component`,
    },
    {
        name: "id",
        format: "string",
        required: false,
        description: `ID to apply to the component`,
    },
    {
        name: "cursorPointer",
        format: "boolean",
        required: false,
        description: `Changes the cursor of the icon to pointer`,
    },
    {
        name: "color",
        format: "string",
        required: false,
        description: `Color of the icon`,
    },
    {
        name: "topPad",
        format: "boolean",
        required: false,
        description: `Pads the top of the icon`,
    },
    {
        name: "botPad",
        format: "boolean",
        required: false,
        description: `Pads the bottom of the icon`,
    },
    {
        name: "rightPad",
        format: "boolean",
        required: false,
        description: `Pads the right of the icon`,
    },
    {
        name: "leftPad",
        format: "boolean",
        required: false,
        description: `Pads the left of the icon`,
    },
    {
        name: "onClick",
        format: "Function",
        required: false,
        description: ` Callback function to call when the base is clicked`,
    },
];
