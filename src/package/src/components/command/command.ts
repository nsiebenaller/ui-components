import { renderAlert, renderConfirm, renderModal } from "./manager";

function alert(
    children: React.ReactNode | undefined,
    confirmText?: string
): Promise<boolean> {
    return renderAlert(children, confirmText);
}

function confirm(
    children: React.ReactNode | undefined,
    confirmText?: string,
    cancelText?: string
) {
    return renderConfirm(children, confirmText, cancelText);
}

function modal(children: React.ReactNode | undefined) {
    return renderModal(children);
}

interface CommandType {
    alert: (
        children: React.ReactNode | undefined,
        confirmText?: string
    ) => Promise<boolean>;
    confirm: (
        children: React.ReactNode | undefined,
        confirmText?: string,
        cancelText?: string
    ) => Promise<boolean>;
    modal: (children: React.ReactNode | undefined) => Promise<boolean>;
}
const command: CommandType = {
    alert,
    confirm,
    modal,
};

export default command;
