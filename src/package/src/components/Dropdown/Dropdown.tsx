import React, { useEffect } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/props";
import useRefState from "../../helpers/RefState";
import { OptionFormat } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";
import DomUtil from "../../helpers/DomUtil";
import uniqueId from "../../helpers/uniqueId";

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

    /** *Optional* - Text to display if there are no options (default: 'none') */
    noOptionsText?: string;
}
let targetText: string = "";
const NO_OPTIONS_TEXT = "none";
export default function Dropdown(props: Props) {
    const [id, _] = useRefState<string>(uniqueId());
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
            id,
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
                        id={`option-${id.current}-${idx}`}
                        selected={OptionUtil.match(option, props.selected)}
                        targeted={idx === targetRef.current}
                        onClick={handleClick(option)}
                        centered={props.centered}
                    >
                        {OptionUtil.valueOf(option)}
                    </Option>
                );
            })}
            {props.options.length === 0 && (
                <Option centered={props.centered} disabled>
                    {props.noOptionsText || NO_OPTIONS_TEXT}
                </Option>
            )}
        </Select>
    );
}

function createKeyboardEventListener(
    id: React.MutableRefObject<string>,
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

            if (matchingIndex !== undefined) {
                focusElement(id.current, matchingIndex);
            }
            return;
        }

        // Handle Arrow Key Down
        if (e.key === "ArrowDown") {
            if (targetIdx === undefined) {
                setTarget(0);
                focusElement(id.current, 0);
            } else if (targetIdx !== props.options.length - 1) {
                setTarget(targetIdx + 1);
                focusElement(id.current, targetIdx + 1);
            }
        }

        // Handle Arrow Key Up
        if (e.key === "ArrowUp") {
            if (targetIdx === undefined) {
                setTarget(0);
                focusElement(id.current, 0);
            } else if (targetIdx !== 0) {
                setTarget(targetIdx - 1);
                focusElement(id.current, targetIdx - 1);
            }
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

function focusElement(dropdownId: string, optionId: number) {
    const identifier = `option-${dropdownId}-${optionId}`;
    const option = document.getElementById(identifier);
    if (option) option.scrollIntoView();
}
