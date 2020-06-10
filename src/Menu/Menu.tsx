import React from 'react'
import './Menu.css'
import MenuItem from './MenuItem/MenuItem'

interface Props {
    component: string;
    setComponent: Function;
}

const components = ["TextField"]

export default function Menu(props: Props) {
    return (
        <div className={"menu"}>
            <div className={"menu-header"}>EBRAP-UI</div>
            {
                components.map((comp, idx) => (
                    <MenuItem 
                        key={`menu-item-${idx}`} 
                        label={comp} 
                        setComponent={props.setComponent} 
                        selected={comp === props.component} 
                    />)
                )
            }
        </div>
    )
}
