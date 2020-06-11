import React from "react";
import { Icon } from "../../package/dist";
import { IconRow } from './style'

export default function IconPage() {
  return (
    <div>
      <h1>Icon Component</h1>
      <IconWithLabel iconName={"ArrowDropDown"} />
      <IconWithLabel iconName={"CheckBox"} />
      <IconWithLabel iconName={"CheckBoxOutlineBlank"} />
    </div>
  );
}

interface Props {
    iconName: string;
}
const IconWithLabel = (props: Props) => (
    <IconRow>
        <Icon iconName={props.iconName} />
        <span>{props.iconName}</span>
    </IconRow>
)
