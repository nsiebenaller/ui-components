import React from "react";
import { colors, textColors } from "../../../package/dist";
import { stdHue } from "../../../package/dist/colors/helpers";
import "./style.css";
const colorMap: any = colors;
const textMap: any = textColors;

const sortedColors = new Map<string, Array<string>>();
Object.keys(colorMap).forEach((c) => {
    const hue = stdHue(c);
    if (!hue) return;
    const vals = sortedColors.get(hue);
    if (!vals) {
        const arr = new Array<string>();
        arr.push(c);
        sortedColors.set(hue, arr);
    } else {
        vals.push(c);
        sortedColors.set(hue, vals);
    }
});
const keys = new Array<string>();
sortedColors.forEach((_, key) => {
    keys.push(key);
});

function ColorsPage() {
    return (
        <div>
            <h1>Colors</h1>
            <div className={"color-container"}>
                {keys.map((hue, idx) => (
                    <HueSample key={`hue-${idx}`} hue={hue} />
                ))}
            </div>
        </div>
    );
}

interface HueSampleProps {
    hue: string;
}
function HueSample({ hue }: HueSampleProps) {
    const hueColors = sortedColors.get(hue);
    if (!hueColors) return null;
    return (
        <div>
            <h2 className={"color-header"}>{hue}</h2>
            {hueColors.map((key, idx) => (
                <div
                    key={`color-${idx}`}
                    className={"color-item"}
                    style={{
                        background: colorMap[key],
                        color: textMap[key],
                    }}
                >
                    <span>{key}</span>
                </div>
            ))}
        </div>
    );
}

ColorsPage.pageName = "Colors";
export default ColorsPage;
