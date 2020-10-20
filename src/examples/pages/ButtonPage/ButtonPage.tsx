import React, { useState } from "react";
import { Button, Icon } from "../../../package/dist";
import { properties, codeSample1, codeSample2, codeSample3 } from "./doc";
import Documentation from "../../Documentation/Documentation";
import Example from "../../Example/Example";
import Code from "../../Code/Code";

function ButtonPage() {
    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return (
        <div>
            <h1>Button Component</h1>
            <h2>Regular Buttons</h2>
            <p>
                Buttons communicate actions that users can take. They contain
                actions that are primary to your app. They are typically placed
                throughout your UI, in places like: Dialogs, Modal windows,
                Forms, Cards, and Toolbars.
            </p>
            <Example>
                <Button color={"blue-900"} onClick={handleClick}>
                    Dark Button
                </Button>
                <Button color={"red-700"} onClick={handleClick}>
                    Light Button
                </Button>
                <Button color={"indigo"} onClick={handleClick} disabled>
                    Disabled
                </Button>
                <Button color={"indigo-100"} onClick={handleClick}>
                    Light Button
                </Button>
                <p>Clicked {count} times!</p>
            </Example>
            <Code text={codeSample1} />

            <h2>Outlined Buttons</h2>
            <p>
                This component can be set to be outline only, reducing the
                emphasis on the page.
            </p>
            <Example>
                <Button
                    color={"blue-700"}
                    variant={"outlined"}
                    onClick={handleClick}
                >
                    Indigo
                </Button>
                <Button
                    color={"blue-900"}
                    variant={"outlined"}
                    onClick={handleClick}
                >
                    Dark Button
                </Button>
                <Button
                    color={"red-700"}
                    variant={"outlined"}
                    onClick={handleClick}
                    disabled
                >
                    Disabled Button
                </Button>
            </Example>
            <Code text={codeSample2} />

            <h2>Button with Icon</h2>
            <p>
                This component can utlize an icon, giving it a distinguished
                purpose.
            </p>
            <Example>
                <Button color={"red"} onClick={handleClick} botPad topPad>
                    <Icon
                        iconName={"CalendarToday"}
                        color={"white"}
                        cursorPointer
                        rightPad
                    />
                    Icon
                </Button>
                <Button color={"blue-900"} variant={"outlined"} botPad topPad>
                    <Icon
                        iconName={"CalendarToday"}
                        color={"blue-900"}
                        cursorPointer
                        rightPad
                    />
                    Outlined Icon
                </Button>
            </Example>
            <Code text={codeSample3} />

            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
ButtonPage.pageName = "Button";
export default ButtonPage;
