export interface Props {
    /** *Optional* - Class to apply to the component */
    className?: string;

    /** *Optional* - ID to apply to the component */
    id?: string;

    /** *Optional* - CSS to apply to the List component */
    styledCSSList?: string;

    /** *Optional* - Label to display above the input */
    label?: React.ReactNode;

    /** *Optional* - What to render in the popup dropdown list */
    children?: React.ReactNode;

    /** *Optional* - Flag to disable this input */
    disabled?: boolean;

    /** *Optional* - Value to display in the input while the list is not open */
    value?: string;

    /** *Optional* - Error text to display under the input */
    error?: string;

    /** *Optional* - Error outline to display around the input*/
    errorOutline?: boolean;

    /** *Optional* - Closes the option list when an option is clicked */
    autoClose?: boolean;

    /** *Optional* - Callback function called when the dropdown list is toggled */
    onToggle?: (value: boolean) => void;

    /** *Optional* - Forced state of open */
    open?: boolean;

    /** *Optional* - Placeholder to display in the input */
    placeholder?: string | undefined;

    /** *Optional* - Callback function to call when input is changed */
    onInput?: ((value: string) => void) | undefined;

    /** *Optional* - Allows input to be entered in the input & allows use of "onInput" prop */
    allowInput?: boolean;

    /** *Optional* - Disables constrained width of option list */
    noWrap?: boolean;

    /** *Optional* - Defines element as block style (width 100%) */
    fullWidth?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
}
