import React from "react";
import { Icon, Option } from "../../index";
import { TreeOptionType, TreeselectClickHandler } from "../../types/types";
import { isGroupOpen, isOptionSelected } from "./utils";
import uniqueId from "../../helpers/uniqueId";
import OptionUtil from "../../helpers/OptionUtil";

interface Props {
    options: Array<TreeOptionType>;
    openedGroups: Array<TreeOptionType>;
    selected?: TreeOptionType;
    handleClick: TreeselectClickHandler;
}
export default function TreeOptions({
    options,
    openedGroups,
    selected,
    handleClick,
}: Props) {
    return (
        <React.Fragment>
            {renderOptions(options, openedGroups, selected, handleClick)}
        </React.Fragment>
    );
}

function renderOptions(
    options: Array<TreeOptionType>,
    openedGroups: Array<TreeOptionType>,
    selected: TreeOptionType | undefined,
    handleClick: TreeselectClickHandler,
    depth: number = 0,
    renderable: Array<React.ReactNode> = []
): Array<React.ReactNode> {
    let items: Array<React.ReactNode> = Array.from(renderable);

    options.forEach((option) => {
        const isOpen = isGroupOpen(option, openedGroups, depth);
        const isSelected = selected
            ? isOptionSelected(option, selected)
            : false;

        items.push(
            <TreeselectOption
                key={uniqueId("option")}
                handleClick={handleClick}
                option={option}
                depth={depth}
                isOpen={isOpen}
                isSelected={isSelected}
            />
        );
        if (!option.children || option.children.length === 0 || !isOpen) return;
        items = renderOptions(
            option.children,
            openedGroups,
            selected,
            handleClick,
            depth + 1,
            items
        );
    });

    return items;
}

interface OptionProps {
    option: TreeOptionType;
    depth: number;
    isOpen: boolean;
    isSelected: boolean;
    handleClick: TreeselectClickHandler;
}
function TreeselectOption({
    option,
    depth,
    isOpen,
    isSelected,
    handleClick,
}: OptionProps) {
    return (
        <Option
            styledCSS={`padding-left: ${depth * 20 + 10}px`}
            onClick={() => handleClick(option)}
            selected={isSelected}
        >
            {OptionUtil.valueOf(option)}
            {option.children && <Arrow isOpen={isOpen} />}
        </Option>
    );
}

function Arrow({ isOpen }: any) {
    return (
        <Icon
            iconName={isOpen ? "ArrowDropDown" : "ArrowRight"}
            cursorPointer
        />
    );
}
