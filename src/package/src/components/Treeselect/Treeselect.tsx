import React, { useEffect, useState } from "react";
import { Select } from "../index";
import { Props as SelectProps } from "../Select/props";
import useRefState from "../../helpers/RefState";
import { TreeOptionType, TreeselectClickHandler } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";
import { formatOptions, isOptionSelected } from "./utils";
import TreeOptions from "./TreeOptions";

interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<TreeOptionType>;

    /** *Optional* - Option to display that is selected */
    selected?: TreeOptionType;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: TreeselectClickHandler | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;

    /** *Optional* - Defines a max-height for the list of options (default: 1000px) */
    maxHeight?: number;
}
let optionMap = new Map<string, TreeOptionType>();
export default function Treeselect(props: Props) {
    const [openRef, setOpen] = useRefState<boolean>(false);
    const [openedGroups, setOpenedGroups] = useState<Array<TreeOptionType>>([]);
    const [options, setOptions] = useState<Array<TreeOptionType>>([]);

    useEffect(() => {
        const result = formatOptions(props.options);
        optionMap = result.map;
        setOptions(result.options);
    }, [props.options]);

    const handleClick = (option: TreeOptionType) => {
        if (openedGroups.some((x) => isOptionSelected(x, option))) {
            // Option was already opened, close it
            setOpenedGroups(
                openedGroups.filter((x) => !isOptionSelected(x, option))
            );
        } else {
            // Open wasn't opened, open it
            const groups = Array.from([option]);
            let item: TreeOptionType | undefined = option;
            while (item && item.__parentId__) {
                item = optionMap.get(item.__parentId__);
                if (!item) break;
                groups.push(item);
            }
            groups.reverse();
            setOpenedGroups(groups);
        }

        // Fire callback if selectable
        if (option.selectable && props.onChange) {
            props.onChange(option);
            setOpen(false);
        }
    };

    const maxHeight = props.maxHeight || 1000;
    const style = `max-height: ${maxHeight}px;`;

    return (
        <Select
            onToggle={setOpen}
            open={openRef.current}
            value={props.value || OptionUtil.valueOf(props.selected)}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            label={props.label}
            placeholder={props.placeholder}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            styledCSSList={style}
            noWrap
        >
            <TreeOptions
                options={options}
                openedGroups={openedGroups}
                selected={props.selected}
                handleClick={handleClick}
            />
        </Select>
    );
}
