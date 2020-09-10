import { Props as SelectProps } from "../Select/props";
import { OptionFormat } from "../../types/types";

export type onChangeType = (
    selected: OptionFormat,
    event: React.MouseEvent | KeyboardEvent | undefined
) => void;
export interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<OptionFormat>;

    /** *optional* - Options to display that are selected */
    selected?: OptionFormat;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: onChangeType | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Minimum length of input string before options appear */
    minLength?: number;

    /** *Optional* - Text to display if there are no matching options */
    noMatchText?: string;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}
