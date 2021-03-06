import uniqueId from "../../helpers/uniqueId";
import { TreeOptionType } from "../../types/types";
import OptionUtil from "../../helpers/OptionUtil";

export function formatOptions(
    input: Array<TreeOptionType>,
    parentId: string | undefined = undefined
): { map: Map<string, TreeOptionType>; options: Array<TreeOptionType> } {
    let map = new Map<string, TreeOptionType>();
    const options = new Array();

    input.forEach((option) => {
        // Setup current option
        const id = uniqueId();
        if (!option.__identifier__) {
            option.__identifier__ = id;
        }
        option.__parentId__ = parentId;
        map.set(id, option);
        if (!option.children || option.children.length === 0) {
            return options.push(option);
        }

        // Calculate children
        const { map: childMap, options: childOptions } = formatOptions(
            option.children,
            id
        );
        map = new Map([
            ...Array.from(map.entries()),
            ...Array.from(childMap.entries()),
        ]);
        option.children = childOptions;
        return options.push(option);
    });

    return { map, options };
}

export function isGroupOpen(
    option: TreeOptionType,
    openGroups: Array<TreeOptionType>,
    depth: number
) {
    const currGroup = openGroups[depth];
    if (!currGroup) return false;
    return OptionUtil.valueOf(currGroup) === OptionUtil.valueOf(option);
}

export function isOptionSelected(
    option: TreeOptionType,
    selected: TreeOptionType
) {
    if (option.__identifier__ && selected.__identifier__) {
        return option.__identifier__ === selected.__identifier__;
    }
    return OptionUtil.valueOf(option) === OptionUtil.valueOf(selected);
}
