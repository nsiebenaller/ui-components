import React from "react";
import { colors } from "../../../package/dist";
import "./style.css";
const colorMap: any = colors;

export default function ColorsPage() {
    console.log(colors);
    return (
        <div>
            <h1>Colors</h1>
            <div className={"color-container"}>
                {Object.keys(colorMap).map((colorKey, idx) => (
                    <div
                        key={`color-${idx}`}
                        className={"color-item"}
                        style={{ background: colorMap[colorKey] }}
                    >
                        <span>{colorKey}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
