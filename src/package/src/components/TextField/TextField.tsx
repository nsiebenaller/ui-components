import React, { FormEventHandler, KeyboardEvent } from "react";
import { Base, Input, Label, Error } from "./style";

interface Props {
  /** *Optional* - Current value of the input */
  value?: string | number | string[] | undefined;

  /** *Optional* - Class to apply to the component */
  className?: string;

  /** *Optional* - ID to apply to the component */
  id?: string;

  /** *Optional* - Placeholder text to display */
  placeholder?: string;

  /** *Optional* - Label to display above the input */
  label?: React.ReactNode;

  /** *Optional* - Defines element as block style (width 100%) */
  fullWidth?: boolean;

  /** *Optional* - Defines the input as a certain type (number, password) Default: "text" */
  type?: "password" | "number" | "text";

  /** *Optional* - Function to call when input changes */
  onChange?: FormEventHandler;

  /** *Optional* - Function to call when enter is pressed */
  onEnter?: Function;

  /** *Optional* - Error text to display under the input */
  error?: string;

  /** *Optional* - Flag to disable this input */
  disabled?: boolean;
}

export default function TextField(props: Props) {
  const styles = {
    id: props.id || undefined,
    className: props.className || undefined,
  };

  const handleEnter = (e: KeyboardEvent) =>
    props.onEnter && e.key === "Enter" && props.onEnter(e);

  return (
    <Base>
      <Label visible={!!props.label}>{props.label ? props.label : 'hidden'}</Label>
      <Input
        defaultValue={props.value}
        placeholder={props.placeholder}
        onInput={props.onChange || undefined}
        onKeyPress={handleEnter}
        type={props.type || "text"}
        fullWidth={props.fullWidth}
        disabled={props.disabled}
        {...styles}
      />
      <Error visible={!!props.error}>{props.error ? props.error : 'hidden'}</Error>
    </Base>
  );
}
