export interface OptionType {
    value: string;
    label?: string;
    [key: string]: any;
}

export type OptionFormat = OptionType | string;

export interface TreeOptionType {
    value: string;
    label?: string;
    children?: Array<TreeOptionType>;
    selectable?: boolean;
    [key: string]: any;
}

export type TreeselectClickHandler = (option: TreeOptionType) => void;
