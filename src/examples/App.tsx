import React, { useState } from "react";
import "./App.css";
import Menu from "./Menu/Menu";

import DropdownPage from "./pages/DropdownPage";
import MultiselectPage from "./pages/MultiselectPage";
import SelectPage from "./pages/SelectPage";
import TextFieldPage from "./pages/TextFieldPage";

const components = ["Dropdown", "Multiselect", "Select", "TextField"];
const componentMap = new Map();
componentMap.set("Dropdown", DropdownPage);
componentMap.set("Multiselect", MultiselectPage);
componentMap.set("Select", SelectPage);
componentMap.set("TextField", TextFieldPage);

export default function App() {
  const [component, setComponent] = useState("Multiselect");

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
