import React from "react";
import "./style.css";
import { Icon } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function IconPage() {
    return (
        <div>
            <h1>Icon Component</h1>
            <h4>Available Icons</h4>
            <table className={"icon-table"}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Icon Name</th>
                    </tr>
                </thead>
                <tbody>
                    <IconRow iconName={"ArrowBack"} />
                    <IconRow iconName={"ArrowDropDown"} />
                    <IconRow iconName={"ArrowDropUp"} />
                    <IconRow iconName={"ArrowLeft"} />
                    <IconRow iconName={"ArrowRight"} />
                    <IconRow iconName={"Autorenew"} />
                    <IconRow iconName={"CalendarToday"} />
                    <IconRow iconName={"Cancel"} />
                    <IconRow iconName={"Check"} />
                    <IconRow iconName={"CheckBox"} />
                    <IconRow iconName={"CheckBoxOutlineBlank"} />
                    <IconRow iconName={"CheckCircle"} />
                    <IconRow iconName={"CheckCircleOutline"} />
                    <IconRow iconName={"ChevronRight"} />
                    <IconRow iconName={"CloudUpload"} />
                    <IconRow iconName={"Delete"} />
                    <IconRow iconName={"Edit"} />
                    <IconRow iconName={"QueryBuilder"} />
                    <IconRow iconName={"RadioButtonChecked"} />
                    <IconRow iconName={"RadioButtonUnchecked"} />
                    <IconRow iconName={"Save"} />
                    <IconRow iconName={"Search"} />
                </tbody>
            </table>
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
IconPage.pageName = "Icon";
export default IconPage;

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
