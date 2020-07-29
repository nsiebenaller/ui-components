export type ColorHue =
    | "amber"
    | "blue"
    | "bluegrey"
    | "brown"
    | "cyan"
    | "deeporange"
    | "deeppurple"
    | "green"
    | "grey"
    | "indigo"
    | "lightblue"
    | "lightgreen"
    | "lime"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "teal"
    | "yellow";

export function castColorHue(input: string): ColorHue | undefined {
    switch (input) {
        case "amber":
        case "blue":
        case "bluegrey":
        case "brown":
        case "cyan":
        case "deeporange":
        case "deeppurple":
        case "green":
        case "grey":
        case "indigo":
        case "lightblue":
        case "lightgreen":
        case "lime":
        case "orange":
        case "pink":
        case "purple":
        case "red":
        case "teal":
        case "yellow":
            return input;
        default:
            return undefined;
    }
}
