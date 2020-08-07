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
type FunctionType = (props: any) => React.ReactNode | undefined;
export function renderChildren(
    children: React.ReactNode | undefined,
    props?: any
): React.ReactNode | undefined {
    return isFn(children) ? (children as FunctionType)(props) : children;
}
