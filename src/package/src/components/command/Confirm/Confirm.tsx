import React from "react";
import { Actions } from "../style";
import { Button } from "../../index";
import { renderChildren } from "../utils";
import Modal from "../Modal/Modal";

interface Props {
    children: React.ReactNode | undefined;
    drop?: (confirmed: boolean) => void;
    confirmText?: string;
    cancelText?: string;
    className?: string;
    style?: string;
}
export default function Confirm(props: Props) {
    const handleConfirm = () => props.drop && props.drop(true);
    const handleCancel = () => props.drop && props.drop(false);

    return (
        <Modal
            className={props.className}
            style={props.style}
            drop={props.drop}
        >
            {renderChildren(props.children, { drop: props.drop })}
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
