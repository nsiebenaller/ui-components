export interface TreeOptionType {
    value: string;
    label?: string;
    children?: Array<TreeOptionType>;
    selectable?: boolean;
    [key: string]: any;
}

export type ClickHandlerType = (option: TreeOptionType) => void;
