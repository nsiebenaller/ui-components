import { colors } from "./index";
const colorMap: any = colors;
const DEFAULT_COLOR = "grey-500";

export function colorOrDefault(
    colorString: string | undefined,
    defaultColor?: string
) {
    if (!colorString) {
        if (defaultColor) {
            return colorMap[defaultColor];
        }
        return colorMap[DEFAULT_COLOR];
    }
    const color = colorMap[standardizeColor(colorString)];
    if (!color) return colorMap[defaultColor || DEFAULT_COLOR];
    return color;
}
export function standardizeColor(colorString: string | undefined): string {
    if (!colorString) return "";
    return extractColorValue(colorString) + "-" + extractColorHue(colorString);
}
export function extractColorValue(colorString: string) {
    if (!colorString.includes("-")) {
        return colorString;
    }
    return colorString.substring(0, colorString.indexOf("-"));
}

export function extractColorHue(colorString: string) {
    if (!colorString.includes("-")) {
        return "500";
    }
    return colorString.substring(
        colorString.indexOf("-") + 1,
        colorString.length
    );
}

export function getHoverColor(
    colorString: string,
    variant = "default"
): string {
    if (variant !== "default" && variant !== "outlined") {
        return "white";
    }

    // Standardize color if hue is not given
    const key = standardizeColor(colorString);
    const colorValue = extractColorValue(colorString);

    // Find given color in map
    const color = colorMap[key];
    if (!color) return colorMap[DEFAULT_COLOR];

    // Check if outlined variant
    if (variant === "outlined") {
        return colorMap[colorValue + "-50"];
    }

    const hue = parseInt(
        colorString.substring(colorString.indexOf("-") + 1, colorString.length)
    );

    // Calculate next hue
    if (isNaN(hue)) return colorMap[DEFAULT_COLOR];
    const nextHue = hue + 200 > 900 ? hue - 200 : hue + 200;
    const nextColor = extractColorValue(colorString) + "-" + nextHue;
    const hoverColor = colorMap[nextColor];
    return hoverColor;
}
