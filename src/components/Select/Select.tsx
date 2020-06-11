import React, { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Base, Label, InputBase, Input, List, Error } from "./style";
import Icon from "../../icons/index";

export interface Props {
  /** *Optional* - Class to apply to the component */
  className?: string;

  /** *Optional* - ID to apply to the component */
  id?: string;

  /** *Optional* - Label to display above the input */
  label?: React.ReactNode;

  /** *Optional* - What to render in the popup dropdown list */
  children?: React.ReactNode;

  /** *Optional* - Flag to disable this input */
  disabled?: boolean;

  /** *Optional* - Value to display in the input while the list is not open */
  value?: string;

  /** *Optional* - Error text to display under the input */
  error?: string;

  /** *Optional* - Error outline to display around the input*/
  errorOutline?: boolean;

  /** *Optional* - Closes the option list when an option is clicked */
  autoClose?: boolean;

  /** *Optional* - Callback function called when the dropdown list is toggled */
  onToggle?: (value: boolean) => void;

  /** *Optional* - Forced state of open */
  open?: boolean;
}

let lastPressTab: boolean = false;
export default function Select(props: Props) {
  const list = useRef<HTMLDivElement>(null);
  const base = useRef<HTMLInputElement>(null);
  const [open, _setOpen] = useState<boolean>(false);
  const openRef = useRef(open);
  const setOpen = (value: boolean) => {
    openRef.current = value;
    _setOpen(value);
  };

  const toggleOpen = () => {
    if (props.disabled) return;
    updateDimensions(base.current, list.current);
    setOpen(true);
    if (props.onToggle) props.onToggle(true);
  };
  const toggleClose = () => {
    setOpen(false);
    if (props.onToggle) props.onToggle(false);
  };

  useEffect(() => {
    if (props.open !== undefined) {
      if (props.open) toggleOpen();
      else toggleClose();
    }
    // eslint-disable-next-line
  }, [props.open]);

  useEffect(() => {
    updateDimensions(base.current, list.current);

    // Event handlers
    function handleKeyDown(e: KeyboardEvent) {
      const tabPressed = e.key === "Tab";
      lastPressTab = tabPressed;
      if (tabPressed && openRef.current) {
        setOpen(false);
      }
    }
    function handleClick(e: MouseEvent) {
      lastPressTab = false;
      const clickedBase = isEventContained(e, base.current);
      const clickedList = isEventContained(e, list.current);
      if (clickedBase || clickedList) {
        if (openRef.current && clickedList && props.autoClose) {
          toggleClose();
          return;
        }
        toggleOpen();
      } else {
        toggleClose();
      }
    }
    function handleResize() {
      if (openRef.current) {
        updateDimensions(base.current, list.current);
      }
    }

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("click", handleClick, true);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize, true);
    };
    // eslint-disable-next-line
  }, []);

  const tryFocus = () => {
    if (lastPressTab) {
      toggleOpen();
    }
  };

  const styles = {
    id: props.id || undefined,
    className: props.className || undefined,
  };

  return (
    <Base {...styles}>
      <Label visible={!!props.error}>{props.label && props.label}</Label>
      <InputBase>
        <Input
          ref={base}
          disabled={props.disabled}
          errorOutline={props.errorOutline}
          open={open}
          onFocus={tryFocus}
          value={props.value || ""}
          readOnly
        />
        {createPortal(
          <List ref={list} open={open}>
            {props.children}
          </List>,
          document.getElementsByTagName("BODY")[0]
        )}
        <Icon iconName={"ArrowDropDown"} />
      </InputBase>
      <Error visible={!!props.error}>
        {props.error ? props.error : "hidden"}
      </Error>
    </Base>
  );
}

function updateDimensions(
  base: HTMLInputElement | null,
  list: HTMLDivElement | null
) {
  if (base === null || list === null) return;

  const domRect: DOMRect = base.getBoundingClientRect();
  list.style.top = `${domRect.top + window.scrollY}px`;
  list.style.left = `${domRect.left + window.scrollX}px`;
  list.style.width = `${base.offsetWidth - 2}px`;
}

function isEventContained(
  e: MouseEvent,
  ele: HTMLInputElement | HTMLDivElement | null
): boolean {
  if (!ele) return false;
  const domRect: DOMRect = ele.getBoundingClientRect();
  return (
    domRect.left <= e.clientX &&
    domRect.left + domRect.width >= e.clientX && // X contained
    domRect.top <= e.clientY &&
    domRect.top + domRect.height >= e.clientY // Y contained
  );
}
