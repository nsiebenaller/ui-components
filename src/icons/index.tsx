import React from "react";
import { Base } from "./style";
import ArrowDropDown from "./ArrowDropDown";
import CheckBox from "./CheckBox";
import CheckBoxOutlineBlank from "./CheckBoxOutlineBlank";

const components = new Map();
components.set("ArrowDropDown", ArrowDropDown);
components.set("CheckBox", CheckBox);
components.set("CheckBoxOutlineBlank", CheckBoxOutlineBlank);

interface Props {
  /** *Required* - Icon to display in Capital-Case (ex: "ArrowDropDown") */
  iconName: string;

  /** *Optional* - Class to apply to the component */
  className?: string;

  /** *Optional* - ID to apply to the component */
  id?: string;
}
export default function Icon(props: Props) {
  const IconSVG = components.get(props.iconName || "ArrowDropDown");

  const styles = {
    id: props.id || undefined,
    className: props.className || undefined,
  };
  return (
    <Base {...styles}>
      <IconSVG />
    </Base>
  );
}
