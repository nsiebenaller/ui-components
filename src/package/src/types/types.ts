export interface OptionType {
    value: string;
    label?: string;
    [key: string]: any;
}
export type OptionFormat = OptionType | string;
