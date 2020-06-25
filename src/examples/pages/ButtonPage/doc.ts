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
        description: "Button text to display",
    },
    {
        name: "topPad",
        format: "boolean",
        required: false,
        description:
            "Pads the top of the input (similar to the TextField, Dropdown, or Multiselect inputs)",
    },
    {
        name: "botPad",
        format: "boolean",
        required: false,
        description:
            "Pads the bottom of the input (similar to the TextField, Dropdown, or Multiselect inputs)",
    },
    {
        name: "color",
        format: "ColorType",
        required: false,
        description: "Color to use for the button",
    },
    {
        name: "colorHue",
        format: "string",
        required: false,
        description: "Color value (shade, hue) to use for the button",
    },
    {
        name: "disabled",
        format: "boolean",
        required: false,
        description: "Disables the button preventing further clicks",
    },
    {
        name: "variant",
        format: "Variant",
        required: false,
        description: "Variant of button to display (default: 'default')",
    },
    {
        name: "onClick",
        format: "Function",
        required: false,
        description: "Callback function to call when the button is clicked",
    },
];
