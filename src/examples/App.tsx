import React, { useState } from "react";
import "./App.css";
import Menu from "./Menu/Menu";
import * as pages from "./pages";

// Dynamically load all pages
const pageMap: any = pages;
const componentMap = new Map();
Object.keys(pageMap).forEach((key: any) => {
    componentMap.set(pageMap[key].pageName, pageMap[key]);
});
const components = Array.from(componentMap.keys());

export default function App() {
    const [component, setComponent] = useState("Command");

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
