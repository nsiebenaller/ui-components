import React, { useState } from "react";
import "./App.css";
import Menu from "./Menu/Menu";

import {
    AutocompletePage,
    ButtonPage,
    ColorsPage,
    DatepickerPage,
    DropdownPage,
    IconPage,
    MultiselectPage,
    RadioButtonPage,
    SelectPage,
    TextAreaPage,
    TextFieldPage,
} from "./pages";

const componentMap = new Map();
componentMap.set("Autocomplete", AutocompletePage);
componentMap.set("Button", ButtonPage);
componentMap.set("Colors", ColorsPage);
componentMap.set("Datepicker", DatepickerPage);
componentMap.set("Dropdown", DropdownPage);
componentMap.set("Icon", IconPage);
componentMap.set("Multiselect", MultiselectPage);
componentMap.set("RadioButton", RadioButtonPage);
componentMap.set("Select", SelectPage);
componentMap.set("TextArea", TextAreaPage);
componentMap.set("TextField", TextFieldPage);
const components = Array.from(componentMap.keys());

export default function App() {
    const [component, setComponent] = useState("Colors");

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
