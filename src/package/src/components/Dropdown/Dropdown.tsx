import React, { useEffect } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/props";
import useRefState from "../../helpers/RefState";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";
import DomUtil from "../../helpers/DomUtil";

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
    const [propsRef, setPropsRef] = useRefState<Props | undefined>(props);

    // Save props in RefState for event listeners
    useEffect(() => {
        setPropsRef(props);
    }, [props]);

    const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
        if (!props.onChange || props.disabled) return;
        props.onChange(option, e);
    };

    useEffect(() => {
        // Event handlers
        const listener = createKeyboardEventListener(
            openRef,
            targetRef,
            propsRef,
            setTarget,
            setOpen
        );
        document.addEventListener("keydown", listener, true);
        return () => {
            document.removeEventListener("keydown", listener, true);
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

function createKeyboardEventListener(
    openRef: React.MutableRefObject<boolean>,
    targetRef: React.MutableRefObject<number | undefined>,
    propsRef: React.MutableRefObject<Props | undefined>,
    setTarget: (value: number | undefined) => void,
    setOpen: (value: boolean) => void
) {
    function handleKeyDown(e: KeyboardEvent) {
        const { current: open } = openRef;
        const { current: targetIdx } = targetRef;
        const { current: props } = propsRef;

        if (!open || !props) return;

        // Handle searching the options
        if (DomUtil.isLetter(e) || DomUtil.isNumber(e) || DomUtil.isSpace(e)) {
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
            if (targetIdx === undefined) return;
            if (props.onChange === undefined) return;
            if (props.disabled) return;
            const option = props.options[targetIdx];
            props.onChange(option, e);
            setOpen(false);
            return;
        }
    }
    return handleKeyDown;
}
