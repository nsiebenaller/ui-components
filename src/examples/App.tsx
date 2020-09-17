import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
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
    const defaultPage = "Autocomplete";

    return (
        <BrowserRouter>
            <div className="App">
                <Menu pages={components} defaultPage={defaultPage} />
                <div className="content">
                    <Route path={"/ui-components-demo"} exact>
                        <PageContent page={defaultPage} />
                    </Route>
                    {components.map((c: string, idx: number) => (
                        <Route path={`/ui-components-demo/${c}`} key={idx}>
                            <PageContent page={c} />
                        </Route>
                    ))}
                </div>
            </div>
        </BrowserRouter>
    );
}

interface Props {
    page: string;
}
function PageContent({ page }: Props) {
    const Page = componentMap.get(page);
    return <Page />;
}
