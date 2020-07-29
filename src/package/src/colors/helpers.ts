import { colors, textColors } from "./index";
import { ColorHue, castColorHue } from "./types";
const colorMap: any = colors;
const textColorMap: any = textColors;

// Constants
const DEFAULT_HUE = "grey";
const DEFAULT_SHADE = "500";
const DEFAULT_COLOR = `${DEFAULT_HUE}-${DEFAULT_SHADE}`;

export function stdColor(input?: string): string | undefined {
    if (!input) return undefined;
    if (colorMap[input]) return input;
    const hue = stdHue(input);
    const shade = stdShade(input);
    const colorKey = `${hue}-${shade}`;
    if (colorMap[colorKey]) return colorKey;
    return undefined;
}
export function stdHue(input: string): ColorHue | undefined {
    if (!input.includes("-")) return castColorHue(input);
    return castColorHue(input.substring(0, input.indexOf("-")));
}
export function stdShade(input: string): string {
    if (!input.includes("-")) return DEFAULT_SHADE;
    return input.substring(input.indexOf("-") + 1, input.length);
}
export function toHex(input: string): string {
    return colorMap[colorOrDefault(input)];
}

export function colorOrDefault(input?: string, defaultColor?: string): string {
    const color = stdColor(input);
    if (color) return color;
    const defColor = stdColor(defaultColor);
    if (defColor) return defColor;
    return DEFAULT_COLOR;
}

export function getHoverColor(input?: string): string {
    const color = stdColor(input);
    const hue = stdHue(color || DEFAULT_COLOR);
    const shade = parseInt(stdShade(color || DEFAULT_COLOR));
    if (isNaN(shade)) return DEFAULT_COLOR;
    const nextShade = shade + 200 > 900 ? shade - 200 : shade + 200;
    return `${hue}-${nextShade}`;
}

export function getTextColor(input?: string): string {
    const color = colorOrDefault(input, "white");
    return textColorMap[color];
}
