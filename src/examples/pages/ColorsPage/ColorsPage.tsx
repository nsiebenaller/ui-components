import React from "react";
import { colors, textColors } from "../../../package/dist";
import "./style.css";
const colorMap: any = colors;
const textMap: any = textColors;

export default function ColorsPage() {
    return (
        <div>
            <h1>Colors</h1>
            <div className={"color-container"}>
                {Object.keys(colorMap).map((colorKey, idx) => (
                    <div
                        key={`color-${idx}`}
                        className={"color-item"}
                        style={{
                            background: colorMap[colorKey],
                            color: textMap[colorKey],
                        }}
                    >
                        <span>{colorKey}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
