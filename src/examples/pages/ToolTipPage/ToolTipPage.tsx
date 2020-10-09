import React, { useState } from "react";
import { ToolTip, Icon } from "../../../package/dist";

function ToolTipPage() {
    return (
        <div>
            <h1>ToolTip Component</h1>
            <ToolTip content={"Hello I am a Tool Tip!"}>
                <Icon iconName={"Check"} />
            </ToolTip>
        </div>
    );
}
ToolTipPage.pageName = "ToolTip";
export default ToolTipPage;
