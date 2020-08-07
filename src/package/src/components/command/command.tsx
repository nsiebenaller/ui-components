import React from "react";
import ReactDOM from "react-dom";
import Alert from "./Alert/Alert";
import Confirm from "./Confirm/Confirm";
import Modal from "./Modal/Modal";
import { createHook } from "./utils";

function hardPortal(
    children: React.ReactNode,
    dropCallback?: (data: any) => void,
    className?: string,
    style?: string
): [HTMLDivElement, (data: any) => void] {
    const hook = createHook(className, style);
    const drop = (data: any) => {
        if (dropCallback) dropCallback(data);
        hook.remove();
    };
    ReactDOM.render(
        React.cloneElement(children as React.ReactElement, { drop }),
        hook
    );
    return [hook, drop];
}

interface Options {
    confirmText?: string;
    cancelText?: string;
    className?: string;
    style?: string;
    hookClassName?: string;
    hookStyle?: string;
}

function alert(children: React.ReactNode, options?: Options): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const callback = () => resolve(true);
        hardPortal(
            <Alert
                confirmText={options?.confirmText}
                className={options?.className}
                style={options?.style}
            >
                {children}
            </Alert>,
            callback,
            options?.hookClassName,
            options?.hookStyle
        );
    });
}

function confirm(
    children: React.ReactNode,
    options?: Options
): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const callback = (data: any) => resolve(data);
        hardPortal(
            <Confirm
                confirmText={options?.confirmText}
                cancelText={options?.cancelText}
                className={options?.className}
                style={options?.style}
            >
                {children}
            </Confirm>,
            callback,
            options?.hookClassName,
            options?.hookStyle
        );
    });
}

function modal(children: React.ReactNode, options?: Options): Promise<any> {
    return new Promise<any>((resolve) => {
        const callback = () => resolve(true);
        hardPortal(
            <Modal className={options?.className} style={options?.style}>
                {children}
            </Modal>,
            callback,
            options?.hookClassName,
            options?.hookStyle
        );
    });
}

export default {
    alert,
    confirm,
    modal,
    hardPortal,
};
