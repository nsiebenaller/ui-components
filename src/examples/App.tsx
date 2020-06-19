import React, { useState } from "react";
import "./App.css";
import Menu from "./Menu/Menu";

import {
    AutocompletePage,
    ButtonPage,
    DatepickerPage,
    DropdownPage,
    IconPage,
    MultiselectPage,
    SelectPage,
    TextAreaPage,
    TextFieldPage,
} from "./pages";

const componentMap = new Map();
componentMap.set("Autocomplete", AutocompletePage);
componentMap.set("Button", ButtonPage);
componentMap.set("Datepicker", DatepickerPage);
componentMap.set("Dropdown", DropdownPage);
componentMap.set("Icon", IconPage);
componentMap.set("Multiselect", MultiselectPage);
componentMap.set("Select", SelectPage);
componentMap.set("TextArea", TextAreaPage);
componentMap.set("TextField", TextFieldPage);
const components = Array.from(componentMap.keys());

export default function App() {
    const [component, setComponent] = useState("Button");

    const Page = componentMap.get(component);

    return (
        <div className="App">
            <Menu
                components={components}
                component={component}
                setComponent={setComponent}
            />
            <div className="content">
                <Page />
            </div>
        </div>
    );
}
