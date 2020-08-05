import React from "react";
import ReactDOM from "react-dom";
import Alert from "./Alert/Alert";
import Confirm from "./Confirm/Confirm";
import Modal from "./Modal/Modal";
import uniqueId from "../../helpers/uniqueId";
import { HookStyle } from "./style";

function createHook(): HTMLDivElement {
    const hook = document.createElement("div");
    hook.id = uniqueId("hook");
    hook.setAttribute("style", HookStyle);
    document.getElementsByTagName("BODY")[0].appendChild(hook);
    return hook;
}

function isFunction(functionToCheck: any) {
    return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === "[object Function]"
    );
}

type HandleCloseType = () => void;
type CloseCallback = (close: HandleCloseType) => React.ReactNode | undefined;

type HandleConfirmType = (confirmed: boolean) => void;
type ConfirmCallback = (
    close: HandleConfirmType
) => React.ReactNode | undefined;

export function renderAlert(
    children: React.ReactNode | undefined | CloseCallback,
    confirmText?: string
): Promise<boolean> {
    const hook = createHook();
    const isFn = isFunction(children);

    return new Promise<boolean>((resolve) => {
        const handleClose = () => {
            hook.remove();
            resolve(true);
        };
        ReactDOM.render(
            <Alert close={handleClose} confirmText={confirmText}>
                {isFn ? (children as CloseCallback)(handleClose) : children}
            </Alert>,
            hook
        );
    });
}

export function renderConfirm(
    children: React.ReactNode | undefined | ConfirmCallback,
    confirmText?: string,
    cancelText?: string
): Promise<boolean> {
    const hook = createHook();
    const isFn = isFunction(children);

    return new Promise<boolean>((resolve) => {
        const handleClose = (confirmed: boolean) => {
            hook.remove();
            resolve(confirmed);
        };
        ReactDOM.render(
            <Confirm
                close={handleClose}
                confirmText={confirmText}
                cancelText={cancelText}
            >
                {isFn ? (children as ConfirmCallback)(handleClose) : children}
            </Confirm>,
            hook
        );
    });
}

export function renderModal(
    children: React.ReactNode | undefined | CloseCallback
): Promise<boolean> {
    const hook = createHook();
    const isFn = isFunction(children);

    return new Promise<boolean>((resolve) => {
        const handleClose = () => {
            hook.remove();
            resolve(true);
        };
        ReactDOM.render(
            <Modal>
                {isFn ? (children as CloseCallback)(handleClose) : children}
            </Modal>,
            hook
        );
    });
}
