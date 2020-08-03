import React, { useEffect, useState } from "react";
import { Select } from "../index";
import { Props as SelectProps } from "../Select/Select";
import useRefState from "../../helpers/RefState";
import { TreeOptionType, ClickHandlerType } from "./types";
import { formatOptions, valueOf } from "./utils";
import TreeOptions from "./TreeOptions";

interface Props extends SelectProps {
    /** *Required* - Options to display that are available to select */
    options: Array<TreeOptionType>;

    /** *Optional* - Option to display that is selected */
    selected?: TreeOptionType;

    /** *Optional* - Callback function to call when an option is selected */
    onChange?: ClickHandlerType | undefined;

    /** *Optional* - Centers the options displayed in the list */
    centered?: boolean;

    /** *Optional* - Pads the top of the input (similar to as if a label was defined) */
    topPad?: boolean;

    /** *Optional* - Pads the bottom of the input (similar to as if an error was defined) */
    botPad?: boolean;
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
        // Option was already opened, close it
        if (openedGroups.some((x) => valueOf(x) === valueOf(option))) {
            setOpenedGroups(
                openedGroups.filter((x) => valueOf(x) !== valueOf(option))
            );
            return;
        }

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

        // Fire callback if selectable
        if (option.selectable && props.onChange) {
            props.onChange(option);
            setOpen(false);
        }
    };

    return (
        <Select
            onToggle={setOpen}
            open={openRef.current}
            value={props.value || valueOf(props.selected)}
            disabled={props.disabled}
            error={props.error}
            errorOutline={props.errorOutline}
            label={props.label}
            placeholder={props.placeholder}
            fullWidth={props.fullWidth}
            topPad={props.topPad}
            botPad={props.botPad}
            styledCSSList={`max-height: 1000px;`}
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
