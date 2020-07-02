import React from "react";
import "./style.css";
import { Icon } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function IconPage() {
    return (
        <div>
            <h1>Icon Component</h1>
            <h4>Available Icons</h4>
            <table className={"icon-table"}>
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Icon Name</th>
                    </tr>
                </thead>
                <tbody>
                    <IconRow iconName={"ArrowBack"} />
                    <IconRow iconName={"ArrowDropDown"} />
                    <IconRow iconName={"ArrowLeft"} />
                    <IconRow iconName={"ArrowRight"} />
                    <IconRow iconName={"CalendarToday"} />
                    <IconRow iconName={"CheckBox"} />
                    <IconRow iconName={"CheckBoxOutlineBlank"} />
                </tbody>
            </table>
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}

interface Props {
    iconName: string;
}
const IconRow = (props: Props) => (
    <tr>
        <td>
            <Icon iconName={props.iconName} />
        </td>
        <td>{props.iconName}</td>
    </tr>
);
