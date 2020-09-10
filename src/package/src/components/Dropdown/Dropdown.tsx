import React, { useEffect } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";
import useRefState from "../../helpers/RefState";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";

type onChangeType = (
    selected: OptionFormat,
    event: React.MouseEvent | KeyboardEvent
) => void;
interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *Optional* - Option to display that is selected */
    selected?: OptionFormat;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: onChangeType | undefined;

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
                    const matchingIndex = OptionUtil.startsWith(
                        targetText,
                        props.options
                    );
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
            value={props.value || OptionUtil.valueOf(props.selected)}
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
                        selected={OptionUtil.match(option, props.selected)}
                        targeted={idx === targetRef.current}
                        onClick={handleClick(option)}
                        centered={props.centered}
                    >
                        {OptionUtil.valueOf(option)}
                    </Option>
                );
            })}
        </Select>
    );
}
