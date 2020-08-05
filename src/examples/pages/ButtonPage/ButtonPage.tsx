import React, { useState } from "react";
import { Button, Icon } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function ButtonPage() {
    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return (
        <div>
            <h1>Button Component</h1>

            <h4>Regular Buttons</h4>
            <Button color={"blue-900"} botPad topPad onClick={handleClick}>
                Dark Button
            </Button>

            <Button color={"red-700"} botPad topPad onClick={handleClick}>
                Light Button
            </Button>

            <Button
                color={"indigo"}
                botPad
                topPad
                onClick={handleClick}
                disabled
            >
                Disabled
            </Button>
            <Button color={"indigo-100"} botPad topPad onClick={handleClick}>
                Light Button
            </Button>

            <p>Clicked {count} times!</p>

            <h4>Outlined Buttons</h4>
            <Button
                color={"blue-700"}
                variant={"outlined"}
                botPad
                topPad
                onClick={handleClick}
            >
                Indigo
            </Button>
            <Button
                color={"blue-900"}
                botPad
                topPad
                variant={"outlined"}
                onClick={handleClick}
            >
                Dark Button
            </Button>

            <Button
                color={"red-700"}
                botPad
                topPad
                variant={"outlined"}
                onClick={handleClick}
                disabled
            >
                Disabled Button
            </Button>
            <h4>Button with Icon</h4>
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
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
ButtonPage.pageName = "Button";
export default ButtonPage;
