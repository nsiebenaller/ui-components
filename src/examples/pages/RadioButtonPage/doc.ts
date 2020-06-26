export const properties = [
    {
        name: "value",
        format: "boolean",
        required: true,
        description: "Currently selected value of the radio button",
    },
    {
        name: "onChange",
        format: "Function",
        required: false,
        description:
            "Callback function to call when the radio button is toggled",
    },
    {
        name: "label",
        format: "string",
        required: false,
        description: "Label to display associated with the input",
    },
    {
        name: "color",
        format: "ColorType",
        required: false,
        description: "Color to use for the icon",
    },
    {
        name: "colorHue",
        format: "string",
        required: false,
        description: "Color value (shade, hue) to use for the icon",
    },
];
