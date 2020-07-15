import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";

interface Props {
    components: Array<string>;
    component: string;
    setComponent: Function;
}

export default function Menu(props: Props) {
    return (
        <div className={"menu"}>
            <div className={"menu-header"}>EBRAP-UI</div>
            <div className={"menu-subheader"}>v1.0.27</div>
            {props.components.map((comp, idx) => (
                <MenuItem
                    key={`menu-item-${idx}`}
                    label={comp}
                    setComponent={props.setComponent}
                    selected={comp === props.component}
                />
            ))}
        </div>
    );
}
