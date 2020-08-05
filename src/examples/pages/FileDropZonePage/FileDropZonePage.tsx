import React from "react";
import { FileDropZone } from "../../../package/dist";
import { properties } from "./doc";
import Documentation from "../../Documentation/Documentation";

function printFileNames(files: File | File[]) {
    if (Array.isArray(files)) {
        files.forEach((f) => {
            console.log(f.name);
        });
        return;
    }
    return console.log(files.name);
}
function FileDropZonePage() {
    return (
        <div>
            <h1>FileInput Component</h1>
            <p>Prints file names in console</p>
            <h4>Sample FileDropZone</h4>
            <FileDropZone
                cursorPointer
                color={"lightblue-100"}
                hoverColor={"lightblue-200"}
                onChange={printFileNames}
            >
                Select a File
            </FileDropZone>
            <br />
            <br />
            <h4>Empty default FileDropZone</h4>
            <FileDropZone onChange={printFileNames} />
            <Documentation title={"Properties"} properties={properties} />
        </div>
    );
}
FileDropZonePage.pageName = "FileDropZone";
export default FileDropZonePage;
