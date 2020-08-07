import React, { useState } from "react";
import { command, Datepicker } from "../../../package/dist";
import {
    firstMessage,
    secondMessage,
    thirdMessage,
    fourthMessage,
    fifthMessage,
    sixthMessage,
} from "./messages";

function CommandPage() {
    const [confirmed, setConfirmed] = useState<boolean>(false);

    const handleAlert = async () => {
        await command.alert(firstMessage);
    };
    const handleAlert2 = async () => {
        await command.alert(secondMessage);
    };
    const handleAlert3 = async () => {
        await command.alert(thirdMessage, { confirmText: "Custom Confirm" });
    };
    const handleAlert4 = async () => {
        await command.alert(fourthMessage);
    };
    const handleConfirm = async () => {
        const confirmed = await command.confirm("Are you sure?");
        setConfirmed(confirmed);
    };
    const handleConfirm2 = async () => {
        const confirmed = await command.confirm(secondMessage);
        setConfirmed(confirmed);
    };
    const handleConfirm3 = async () => {
        const confirmed = await command.confirm("Is there custom text?", {
            cancelText: "I need glasses :(",
            confirmText: "Oh Yeah!!",
            style: "background: lightgrey;",
        });
        setConfirmed(confirmed);
    };
    const handleConfirm4 = async () => {
        const confirmed = await command.confirm(fifthMessage);
        setConfirmed(confirmed);
    };
    const handleModal = async () => {
        await command.modal(sixthMessage);
    };
    const handleModal2 = async () => {
        const form = (props: any) => (
            <div>
                <h2>Date Information</h2>
                <hr />
                <Datepicker label={"Datepicker 1"} value={new Date()} />
                <Datepicker label={"Datepicker 2"} value={new Date()} />
                <hr />
                <button onClick={props.drop}>cancel</button>
                <button onClick={props.drop}>save</button>
            </div>
        );
        await command.modal(form);
    };
    return (
        <div>
            <h1>Command Functions</h1>
            <p>
                Commands are standardized replacement for browsers' built-in
                functions of <code>window.alert</code> and{" "}
                <code>window.confirm</code>. The goal of commands is to provide
                easy, programmatic, drop-in replacements for these built-in
                browser functions with a standardized style and functionality.
                These commands render outside of the react context, if you
                require a more traditional react modal check out `Portal`.
            </p>
            <h4>command.alert</h4>
            <p>
                This command replaces <code>window.alert</code> and provides
                identical functionality. This command takes one required
                parameter which is displayed inside the modal. This command
                returns a promise which can be awaited on to halt execution of a
                function. This command can even hold HTML and fire javascript
                events, however, it does not hold state and will not update
                accordingly. This command also accepts a callback function as
                it's first required parameter which allows HTML templates to
                trigger the close action.
            </p>
            <button onClick={handleAlert}>open alert</button>
            <br />
            <button onClick={handleAlert2}>open alert w/ HTML</button>
            <br />
            <button onClick={handleAlert3}>open alert w/ custom text</button>
            <br />
            <button onClick={handleAlert4}>open alert w/ custom close</button>
            <h4>command.confirm</h4>
            <p>
                This command replaced <code>window.confirm</code> and provides
                identical functionality. This command takes one required
                parameter which is displayed inside the modal. This command
                returns a promise which can be awaited on to halt execution of a
                function. This command can even hold HTML and fire javascript
                events, however, it does not hold state and will not update
                accordingly. This command also accepts a callback function as
                it's first required parameter which allows HTML templates to
                trigger the confirmation action.
            </p>
            <div className={"flex-row"}>
                <div>
                    <button onClick={handleConfirm}>confirm</button>
                    <br />
                    <button onClick={handleConfirm2}>
                        confirm w/ custom HTML
                    </button>
                    <br />
                    <button onClick={handleConfirm3}>
                        confirm w/ custom text
                    </button>
                    <br />
                    <button onClick={handleConfirm4}>
                        confirm w/ custom close
                    </button>
                </div>
                <div className={"center"}>
                    {confirmed ? <b>Confirmed!</b> : <span>Not Confirmed</span>}
                </div>
            </div>
            <h4>command.modal</h4>
            <p>
                This command is a more generic version of{" "}
                <code>window.alert</code> and <code>window.confirm</code> in
                which the required parameter is a callback function to close the
                modal. This command exposes the core functionality of the
                previous two commands to allow more flexibility.
            </p>
            <button onClick={handleModal}>open modal</button>
            <br />
            <button onClick={handleModal2}>open modal w/ datepicker</button>
        </div>
    );
}
CommandPage.pageName = "Command";
export default CommandPage;
