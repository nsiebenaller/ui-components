import React from 'react'
import './MenuItem.css'

interface Props {
    label: string;
    setComponent: Function;
    selected: boolean;
}
export default function MenuItem({ label, setComponent, selected } : Props) {
    return (
        <div className={`menu-item ${selected ? 'menu-item-selected' : ''}`} onClick={() => setComponent(label)}>
            <span>{label}</span>
        </div>
    )
}
