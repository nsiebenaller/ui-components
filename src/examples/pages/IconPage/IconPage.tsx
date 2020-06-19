import React from "react";
import { Icon } from "../../../package/dist";

export default function IconPage() {
    return (
        <div>
            <h1>Icon Component</h1>
            <IconWithLabel iconName={"ArrowDropDown"} />
            <IconWithLabel iconName={"CheckBox"} />
            <IconWithLabel iconName={"CheckBoxOutlineBlank"} />
            <IconWithLabel iconName={"CalendarToday"} />
        </div>
    );
}

interface Props {
    iconName: string;
}
const IconWithLabel = (props: Props) => (
    <div>
        <hr />
        <div>
            <Icon iconName={props.iconName} />
            <span>{props.iconName}</span>
        </div>
    </div>
);
