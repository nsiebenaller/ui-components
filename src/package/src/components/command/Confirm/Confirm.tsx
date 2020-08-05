import React from "react";
import { Actions } from "../style";
import { Button } from "../../index";
import Modal from "../Modal/Modal";

interface Props {
    close: (confirmed: boolean) => void;
    children: React.ReactNode | undefined;
    confirmText?: string;
    cancelText?: string;
}
export default function Confirm(props: Props) {
    const handleConfirm = () => props.close(true);
    const handleCancel = () => props.close(false);
    return (
        <Modal>
            {props.children}
            <Actions>
                <Button
                    variant={"outlined"}
                    color={"blue"}
                    onClick={handleCancel}
                >
                    {props.cancelText || "Cancel"}
                </Button>
                <Button color={"blue"} onClick={handleConfirm}>
                    {props.confirmText || "OK"}
                </Button>
            </Actions>
        </Modal>
    );
}
