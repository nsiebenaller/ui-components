import React from "react";
import { Actions } from "../style";
import { Button } from "../../index";
import Modal from "../Modal/Modal";

interface Props {
    close: () => void;
    children: React.ReactNode | undefined;
    confirmText?: string;
}
export default function Alert(props: Props) {
    return (
        <Modal>
            {props.children}
            <Actions>
                <Button color={"blue"} onClick={props.close}>
                    {props.confirmText || "OK"}
                </Button>
            </Actions>
        </Modal>
    );
}
