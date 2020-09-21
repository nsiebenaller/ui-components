import React from "react";

function TypesPage() {
    return (
        <div>
            <h1>Types</h1>
            <h4>OptionFormat</h4>
            <p>
                This format is used for <em>Dropdown</em> and{" "}
                <em>Multiselect</em>. The format is either a <code>string</code>{" "}
                or <code>OptionType</code>.
            </p>
            <code>type OptionFormat = OptionType | string;</code>
            <h4>OptionType</h4>
            <p>
                This is an object with the required property of{" "}
                <code>value</code>, optional property of <code>label</code> and
                any number of additional properties. Dropdown and Multiselect
                will try to use the <code>label</code> property, then the{" "}
                <code>value</code> property to display the option.
            </p>
            <code>
                interface OptionType {"{"}
                value: string; label?: string; [key: string]: any;
                {"}"}
            </code>
            <h4>TreeOptionType</h4>
            <p>
                This option type is used for the <code>Treeselect</code>{" "}
                component. It is an extension off the <code>OptionType</code>{" "}
                giving additional functionality. <code>children</code> will be
                rendered underneath the group. <code>selectable</code> enables
                click events for the option.
            </p>
            <code>
                interface TreeOptionType {"{"}
                value: string; label?: string; children?: Array
                {"<TreeOptionType>"}; selectable?: boolean; [key: string]: any;
                {"}"}
            </code>
        </div>
    );
}
TypesPage.pageName = "Types";
export default TypesPage;
