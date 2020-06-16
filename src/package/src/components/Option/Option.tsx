import React from "react";
import { OptionBase } from "./style";

interface Props {
  /** *Optional* - Callback function to call when the container is clicked */
  onClick?: ((event: React.MouseEvent) => void) | undefined;

  /** *Optional* - What to render in the container */
  children?: React.ReactNode;

  /** *Optional* - Whether or not this option is selected */
  selected?: boolean;

  /** *Optional* - Whether or not this option is targeted */
  targeted?: boolean;

  /** *Optional* - Centers the option horizontally */
  centered?: boolean;

  /** *Optional* - Disables this option, adding additonal styles & preventing click handlers */
  disabled?: boolean;
}
export default function Option(props: Props) {


  const handleClick = (event: React.MouseEvent) => {
    if(!props.disabled && props.onClick) props.onClick(event)
  }

  return (
    <OptionBase
      disabled={props.disabled}
      selected={props.selected}
      targeted={props.targeted}
      centered={props.centered}
      onClick={handleClick}
    >
      {props.children}
    </OptionBase>
  );
}
