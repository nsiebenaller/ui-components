export type ButtonClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;
export type ButtonVariant = "default" | "outlined" | "minimal";
export interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - Button text to display */
    children?: React.ReactNode;

    /** *Optional* - Pads the top of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
    botPad?: boolean;

    /** *Optional* - Color to use for the button background (ex: 'blue-600') */
    color?: string;

    /** *Optional* - Color to use for the button background (ex: '#FFFFFF') */
    colorHex?: string;

    /** *Optional* - Color to use for the button hover (ex: '#FFFFFF') */
    hoverHex?: string;

    /** *Optional* - Color to use for the button text (ex: '#FFFFFF') */
    textHex?: string;

    /** *Optional* - Disables the button preventing further clicks */
    disabled?: boolean;

    /** *Optional* - Disables box shadow for "default" variant */
    disabledElevation?: boolean;

    /** *Optional* - Variant of button to display */
    variant?: ButtonVariant;

    /** *Optional* - Callback function to call when the button is clicked */
    onClick?: ButtonClickHandler | undefined;
}
