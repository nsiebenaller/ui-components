import React, { useState, useEffect } from "react";
import { Modal, Actions } from "./style";
import { Button } from "../index";

interface Props {
    close: () => void;
}
export default function Alert(props: Props) {
    return (
        <Modal>
            <p>Hello World!</p>
            <Actions>
                <Button color={"blue"} onClick={props.close}>
                    OK
                </Button>
            </Actions>
        </Modal>
    );
}
