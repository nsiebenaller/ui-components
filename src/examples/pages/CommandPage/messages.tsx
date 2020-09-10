import React from "react";
import { Button } from "../../../package/dist";

export const firstMessage =
    "This is a standard alert message. This can be arbitrarily long and the message will always be contained by the modal, even expanding if necessary.";

export const secondMessage = (
    <div>
        <h2>H2 Title</h2>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque cursus ligula id leo euismod pellentesque. Fusce ut
            velit sed nibh tempor malesuada nec eget quam. Nam semper ligula eu
            ex imperdiet condimentum. Integer tortor est, sagittis at magna ac,
            blandit vehicula felis. Mauris sed tincidunt augue, eu venenatis
            tellus. Duis tortor augue, convallis cursus diam nec, posuere
            posuere justo. Nulla in pellentesque sem. Nunc eget efficitur
            mauris.
        </p>
        <button onClick={() => console.log("Event Fired")}>Console log</button>
    </div>
);

export const thirdMessage = "Button text is now custom";

export const fourthMessage = (props: any) => (
    <div>
        <button onClick={props.drop}>Close from HTML</button>
    </div>
);

export const fifthMessage = (props: any) => (
    <div>
        <button onClick={() => props.drop(true)}>Confirm</button>
        <button onClick={() => props.drop(false)}>Unconfirm</button>
    </div>
);

export function sixthMessage(props: any) {
    return (
        <div>
            <h1>Modal!</h1>
            <div>I can have inputs:</div>
            <input />
            <div>I can also have actions:</div>
            <Button
                variant={"outlined"}
                color={"indigo"}
                onClick={() => console.log("Clicked!")}
            >
                click!
            </Button>
            <p>However, state must be stored outside this function!</p>
            <div>I can then close myself:</div>
            <Button color={"red"} onClick={props.drop}>
                Exit!
            </Button>
        </div>
    );
}
