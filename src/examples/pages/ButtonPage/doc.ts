export const codeSample1 = `function Component() {
    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return(
        <div>
            <Button color={"blue-900"} onClick={handleClick}>
                Dark Button
            </Button>
            <Button color={"red-700"} onClick={handleClick}>
                Light Button
            </Button>
            <Button color={"indigo"} onClick={handleClick} disabled>
                Disabled
            </Button>
            <Button color={"indigo-100"} onClick={handleClick}>
                Light Button
            </Button>
            <p>Clicked {count} times!</p>
        </div>
    )
}`;

export const codeSample2 = `function Component() {
    return(
        <div>
            <Button
                color={"blue-700"}
                variant={"outlined"}
                onClick={handleClick}
            >
                Indigo
            </Button>
            <Button
                color={"blue-900"}
                variant={"outlined"}
                onClick={handleClick}
            >
                Dark Button
            </Button>
            <Button
                color={"red-700"}
                variant={"outlined"}
                onClick={handleClick}
                disabled
            >
                Disabled Button
            </Button>
        </div>
    )
}`;

export const codeSample3 = `function Component() {
    return(
        <div>
        <Button color={"red"} onClick={handleClick} botPad topPad>
            <Icon
                iconName={"CalendarToday"}
                color={"white"}
                cursorPointer
                rightPad
            />
            Icon
        </Button>
        <Button color={"blue-900"} variant={"outlined"} botPad topPad>
            <Icon
                iconName={"CalendarToday"}
                color={"blue-900"}
                cursorPointer
                rightPad
            />
            Outlined Icon
            </Button>
        </div>
    )
}`;

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
