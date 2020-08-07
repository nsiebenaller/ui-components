import React from "react";
import { Actions } from "../style";
import { Button } from "../../index";
import { renderChildren } from "../utils";
import Modal from "../Modal/Modal";

interface Props {
    children: React.ReactNode | undefined;
    drop?: () => void;
    confirmText?: string;
    className?: string;
    style?: string;
}
export default function Alert({
    drop,
    children,
    confirmText,
    className,
    style,
}: Props) {
    return (
        <Modal className={className} style={style} drop={drop}>
            {renderChildren(children, { drop })}
            <Actions>
                <Button color={"blue"} onClick={drop}>
                    {confirmText || "OK"}
                </Button>
            </Actions>
        </Modal>
    );
}
