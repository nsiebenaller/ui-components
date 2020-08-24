export type IconType =
    | "ArrowBack"
    | "ArrowDropDown"
    | "ArrowDropUp"
    | "ArrowLeft"
    | "ArrowRight"
    | "Autorenew"
    | "CalendarToday"
    | "Cancel"
    | "Check"
    | "CheckBox"
    | "CheckBoxOutlineBlank"
    | "CheckCircle"
    | "CheckCircleOutline"
    | "ChevronRight"
    | "CloudUpload"
    | "Delete"
    | "Edit"
    | "RadioButtonChecked"
    | "RadioButtonUnchecked"
    | "Save"
    | "Search";

export function castIconType(value: string): IconType | undefined {
    switch (value) {
        case "ArrowBack":
        case "ArrowDropDown":
        case "ArrowDropUp":
        case "ArrowLeft":
        case "ArrowRight":
        case "Autorenew":
        case "CalendarToday":
        case "Cancel":
        case "Check":
        case "CheckBox":
        case "CheckBoxOutlineBlank":
        case "CheckCircle":
        case "CheckCircleOutline":
        case "ChevronRight":
        case "CloudUpload":
        case "Delete":
        case "Edit":
        case "RadioButtonChecked":
        case "RadioButtonUnchecked":
        case "Save":
        case "Search":
            return value;
        default:
            return undefined;
    }
}
