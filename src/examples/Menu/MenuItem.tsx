import React from "react";
import "./MenuItem.css";

interface Props {
    label: string;
    selected: boolean;
    setComponent: (component: string) => void;
}
export default function MenuItem({ label, setComponent, selected }: Props) {
    return (
        <div
            className={`menu-item ${selected ? "menu-item-selected" : ""}`}
            onClick={() => setComponent(label)}
        >
            <span>{label}</span>
        </div>
    );
}
