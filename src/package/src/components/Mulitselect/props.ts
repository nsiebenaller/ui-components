import { Props as SelectProps } from "../Select/props";
import { OptionFormat } from "../../types/types";

export type onChangeType = (
    selected: Array<OptionFormat>,
    event: React.MouseEvent | KeyboardEvent
) => void;
export interface Props extends SelectProps {
    /** *Optional* - Options to display that are available to select */
    options?: Array<OptionFormat>;

    /** *Optional* - Options to display that are currently selected */
    selected?: Array<OptionFormat>;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: onChangeType | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Selected input will recieve a background (similar to the Dropdown component) */
    fillSelected?: boolean;

    /** *Optional* - Sets the maximum number of options to be displayed. comma deliminated before the abbreviated text is displayed (default: 3) */
    rolloverLimit?: number;

    /** *Optional* - Includes an option called 'All' which will return all given options */
    includeAll?: boolean;

    /** *Optional* - Overwrites the default text for 'includeAll' property */
    allText?: string;

    /** *Optional* - Makes the 'Select All' all option sticky */
    stickyAll?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;

    /** *Optional* - Text to display if there are no options (default: 'none') */
    noOptionsText?: string;
}
