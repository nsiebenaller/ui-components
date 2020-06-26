import React from "react";
import "./style.css";

interface DocRow {
    name: string;
    format: string;
    required: boolean;
    description: string;
}
interface Props {
    title: string;
    properties: Array<DocRow>;
}
export default function Documentation(props: Props) {
    return (
        <div>
            <h2>{props.title}</h2>
            <table className="doc-table">
                <thead>
                    <tr>
                        <th>Prop Name</th>
                        <th>Format</th>
                        <th>Required?</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {props.properties.map((property, idx) => (
                        <tr key={`doc-row-${idx}`}>
                            <td>{property.name}</td>
                            <td>{property.format}</td>
                            <td>{property.required ? "Yes" : ""}</td>
                            <td>{property.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
