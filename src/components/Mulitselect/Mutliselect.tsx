import React, { useState, useEffect, useRef } from "react";
import { Select, Option } from "../index";
import { Props as SelectProps } from "../Select/Select";
import Icon from "../../icons/index";

interface Option {
  value: string;
  label?: string;
  [key: string]: any;
}
type OptionFormat = string | Option;

interface Props extends SelectProps {
  /** *Required* - Options to display that are available to select */
  options: Array<OptionFormat>;

  /** *Required* - Options to display that are available to select */
  selected: Array<OptionFormat>;

  /** *Optional* - Callback function to call when an option is selected */
  onChange?:
    | ((
        selected: Array<OptionFormat>,
        event: React.MouseEvent | KeyboardEvent
      ) => void)
    | undefined;

  /** *Optional* - Centers the options displayed in the list */
  centered?: boolean;

  /** *Optional* - Selected input will recieve a background (similar to the Dropdown component) */
  fillSelected?: boolean;
}
let targetText: string = "";
const CHECKED = "CheckBox";
const UNCHECKED = "CheckBoxOutlineBlank";
export default function Mutliselect(props: Props) {
  const [target, _setTarget] = useState<number | undefined>(undefined);
  const [open, _setOpen] = useState(false);
  const targetRef = useRef(target);
  const setTarget = (value: number | undefined) => {
    targetRef.current = value;
    _setTarget(value);
  };
  const openRef = useRef(open);
  const setOpen = (value: boolean) => {
    openRef.current = value;
    _setOpen(value);
  };

  const handleClick = (option: OptionFormat) => (e: React.MouseEvent) => {
    if (props.onChange !== undefined && !props.disabled) {
      if (isSelected(option, props.selected)) {
        const selected = props.selected.filter((x) => x !== option);
        props.onChange(selected, e);
      } else {
        const selected = props.selected.concat(option);
        props.onChange(selected, e);
      }
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
            // Form selected list
            const option = props.options[targetRef.current];
            if (isSelected(option, props.selected)) {
              const selected = props.selected.filter((x) => x !== option);
              props.onChange(selected, e);
            } else {
              const selected = props.selected.concat(option);
              props.onChange(selected, e);
            }
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
      open={open}
      value={props.selected.length + " selected"}
      disabled={props.disabled}
      error={props.error}
      errorOutline={props.errorOutline}
      label={props.label}
    >
      {props.options.map((option, idx) => {
        return (
          <Option
            key={`mutliselect-${idx}`}
            selected={props.fillSelected && isSelected(option, props.selected)}
            targeted={idx === target}
            onClick={handleClick(option)}
            centered={props.centered}
          >
            <Icon
              iconName={
                isSelected(option, props.selected) ? CHECKED : UNCHECKED
              }
            />
            <span>{valueOf(option)}</span>
          </Option>
        );
      })}
    </Select>
  );
}

function valueOf(item: OptionFormat) {
  return typeof item === "string" ? item : item.label || item.value;
}

function isSelected(option: OptionFormat, selected: Array<OptionFormat>) {
  for (let i = 0; i < selected.length; i++) {
    const item = selected[i];
    const optionValue = valueOf(option);
    const itemValue = valueOf(item);
    if (optionValue === itemValue) return true;
  }
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
