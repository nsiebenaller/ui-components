import React from "react";
import uniqueId from "../../helpers/uniqueId";
import { HookStyle } from "./style";

export function createHook(className?: string, style?: string): HTMLDivElement {
    const hook = document.createElement("div");
    hook.id = uniqueId("hook");
    if (className) hook.className = className;
    hook.setAttribute("style", HookStyle + (style || ""));
    document.getElementsByTagName("BODY")[0].appendChild(hook);
    return hook;
}

function isFn(fn: any): boolean {
    return fn && {}.toString.call(fn) === "[object Function]";
}
function addProps(node: any, props?: any): any {
    if (!props) return node;
    if (Array.isArray(node)) {
        return node.map((n) => {
            if (n.props && isFn(n.type)) {
                return { ...n, props: { ...n.props, ...props } };
            }
            return n;
        });
    }
    if (node.props && isFn(node.type)) {
        return { ...node, props: { ...node.props, ...props } };
    }
    return node;
}

type FunctionType = (props: any) => React.ReactNode | undefined;
export function renderChildren(
    children: React.ReactNode | undefined,
    props?: any
): React.ReactNode | undefined {
    if (!children) return children;
    if (isFn(children)) {
        return (children as FunctionType)(props);
    }
    return addProps(children, props);
}
