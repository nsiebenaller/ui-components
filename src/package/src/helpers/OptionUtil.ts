import { OptionFormat } from "../types/types";

function valueOf(option: OptionFormat | undefined): string {
    if (!option) return "";
    if (typeof option === "string") return option;
    return option.label || option.value;
}

function match(
    a: OptionFormat | undefined,
    b: OptionFormat | undefined
): boolean {
    if (!a || !b) return false;
    return valueOf(a) === valueOf(b);
}

function includes(
    a: OptionFormat | undefined,
    array: Array<OptionFormat>
): boolean {
    if (!a) return false;
    const value = valueOf(a);
    for (let i = 0; i < array.length; i++) {
        if (valueOf(array[i]) === value) return true;
    }
    return false;
}

function startsWith(
    text: string,
    array: Array<OptionFormat>
): number | undefined {
    for (let i = 0; i < array.length; i++) {
        if (valueOf(array[i]).startsWith(text)) return i;
    }
    return undefined;
}

function filter(
    a: OptionFormat | undefined,
    array: Array<OptionFormat>
): Array<OptionFormat> {
    if (!a) return array;
    return array.filter((b) => OptionUtil.valueOf(a) !== OptionUtil.valueOf(b));
}

const OptionUtil = {
    valueOf,
    match,
    includes,
    startsWith,
    filter,
};
export default OptionUtil;
