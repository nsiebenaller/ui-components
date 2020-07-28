import React, { useEffect } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";
import useRefState from "../../helpers/RefState";

interface Option {
    value: string;
    label?: string;
    [key: string]: any;
}
type OptionFormat = string | Option;

interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *Optional* - Option to display that is selected */
    selected?: OptionFormat;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?:
        | ((
              selected: OptionFormat,
              event: React.MouseEvent | KeyboardEvent
          ) => void)
        | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}
let targetText: string = "";
export default function Dropdown(props: Props) {
    const [targetRef, setTarget] = useRefState<number | undefined>(undefined);
    const [openRef, setOpen] = useRefState<boolean>(false);

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        if (props.onChange !== undefined && !props.disabled) {
            props.onChange(option, e);
        }
    };

    useEffect(() => {
        // Event handlers
        function handleKeyDown(e: KeyboardEvent) {
            const isOpen = openRef.current;
            if (isOpen) {
                // Handle searching the options
                if (
                    (e.keyCode >= 48 && e.keyCode <= 57) ||
                    (e.keyCode >= 65 && e.keyCode <= 90) ||
                    e.keyCode === 32
                ) {
                    targetText += e.key;
                    const matchingIndex = findFirstMatchingIndex(props.options);
                    if (matchingIndex === undefined) targetText = "";
                    setTarget(matchingIndex);
                    return;
                }

                // Handle clicking of the targeted option
                if (e.key === "Enter") {
                    if (
                        targetRef.current !== undefined &&
                        props.onChange !== undefined &&
                        !props.disabled
                    ) {
                        const option = props.options[targetRef.current];
                        props.onChange(option, e);
                        setOpen(false);
                    }
                    return;
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown, true);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, true);
        };
        // eslint-disable-next-line
    }, []);

    return (
        <Select
            onToggle={setOpen}
            open={openRef.current}
            value={props.value || valueOf(props.selected)}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            label={props.label}
            placeholder={props.placeholder}
            noWrap={props.noWrap}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            autoClose
        >
            {props.options.map((option, idx) => {
                return (
                    <Option
                        key={`dropdown-${idx}`}
                        selected={isSelected(option, props.selected)}
                        targeted={idx === targetRef.current}
                        onClick={handleClick(option)}
                        centered={props.centered}
                    >
                        {valueOf(option)}
                    </Option>
                );
            })}
        </Select>
    );
}

function valueOf(item: OptionFormat | undefined) {
    if (!item) return "";
    return typeof item === "string" ? item : item.label || item.value;
}

function isSelected(option: OptionFormat, item: OptionFormat | undefined) {
    if (!item) return false;
    const optionValue = valueOf(option);
    const itemValue = valueOf(item);
    if (optionValue === itemValue) return true;
    return false;
}

function findFirstMatchingIndex(
    options: Array<OptionFormat>
): number | undefined {
    for (let i = 0; i < options.length; i++) {
        const option: OptionFormat = options[i];
        const optionValue = valueOf(option);
        if (optionValue.startsWith(targetText)) return i;
    }
    return undefined;
}
