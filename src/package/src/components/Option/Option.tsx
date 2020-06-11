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
}
export default function Option(props: Props) {
  return (
    <OptionBase
      onClick={props.onClick}
      selected={props.selected}
      targeted={props.targeted}
      centered={props.centered}
    >
      {props.children}
    </OptionBase>
  );
}
