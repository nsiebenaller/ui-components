import { OptionType, OptionFormat, TreeOptionType } from "../types/types";

function to<T>(option: OptionType | OptionFormat | TreeOptionType): T {
    return (option as unknown) as T;
}

function all<T>(options: Array<OptionType> | Array<OptionFormat> | Array<TreeOptionType>): Array<T> {
    return (options as Array<unknown>) as Array<T>;
}

const Convert = {
    to,
    all
}

export default Convert