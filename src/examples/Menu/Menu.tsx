import React from "react";
import { withRouter, RouteComponentProps } from "react-router";
import "./Menu.css";
import MenuItem from "./MenuItem";
import packageJson from "../../package/package.json";

interface IParams {}
interface Props extends RouteComponentProps<any> {
    pages: Array<string>;
    defaultPage: string;
}

function Menu({ pages, defaultPage, history, location: { pathname } }: Props) {
    const changePage = (component: string) => {
        history.push(`/ui-components-demo/${component}`);
    };
    const currentPage = getCurrentPage(pathname, pages) || defaultPage;

    return (
        <div className={"menu"}>
            <div className={"menu-header"}>EBRAP-UI</div>
            <div className={"menu-subheader"}>v{packageJson.version}</div>
            {pages.map((page, idx) => (
                <MenuItem
                    key={`menu-item-${idx}`}
                    label={page}
                    setComponent={changePage}
                    selected={page === currentPage}
                />
            ))}
        </div>
    );
}
export default withRouter(Menu);

function getCurrentPage(url: string, pages: Array<string>): string | undefined {
    const lastIdx = url.lastIndexOf("/") + 1;
    const currentPage = url.substring(lastIdx);
    if (pages.includes(currentPage)) return currentPage;
    return undefined;
}
