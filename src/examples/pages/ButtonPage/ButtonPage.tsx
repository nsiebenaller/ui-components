import React, { useState } from "react";
import { Button } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

export default function ButtonPage() {
    const [count, setCount] = useState(0);
    const handleClick = () => setCount(count + 1);
    return (
        <div>
            <h1>Button Component</h1>

            <h4>Regular Buttons</h4>
            <Button
                color={"blue"}
                colorHue={"900"}
                botPad
                topPad
                onClick={handleClick}
            >
                Dark Button
            </Button>

            <Button
                color={"red"}
                colorHue={"700"}
                botPad
                topPad
                onClick={handleClick}
            >
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

            <p>Clicked {count} times!</p>

            <h4>Outlined Buttons</h4>
            <Button
                color={"blue"}
                colorHue={"700"}
                variant={"outlined"}
                botPad
                topPad
                onClick={handleClick}
            >
                Indigo
            </Button>
            <Button
                color={"blue"}
                colorHue={"900"}
                botPad
                topPad
                variant={"outlined"}
                onClick={handleClick}
            >
                Dark Button
            </Button>

            <Button
                color={"red"}
                colorHue={"700"}
                botPad
                topPad
                variant={"outlined"}
                onClick={handleClick}
                disabled
            >
                Disabled Button
            </Button>
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
