export type IconType =
    | "ArrowBack"
    | "ArrowDropDown"
    | "ArrowDropUp"
    | "ArrowLeft"
    | "ArrowRight"
    | "Autorenew"
    | "CalendarToday"
    | "CheckBox"
    | "CheckBoxOutlineBlank";

export function castIconType(value: string): IconType | undefined {
    switch (value) {
        case "ArrowBack":
        case "ArrowDropDown":
        case "ArrowDropUp":
        case "ArrowLeft":
        case "ArrowRight":
        case "Autorenew":
        case "CalendarToday":
        case "CheckBox":
        case "CheckBoxOutlineBlank":
            return value;
        default:
            return undefined;
    }
}
