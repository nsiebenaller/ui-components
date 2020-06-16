import React from "react";
import { Base, ButtonBase, TopPad, BotPad } from "./style";
import colors from '../../colors'
import { ColorType, getTextColor, getHoverColor } from '../../colors/types'

interface Props {
  /** *Optional* - Class to apply to the component */
  className?: string;

  /** *Optional* - ID to apply to the component */
  id?: string;

  /** *Optional* - Button text to display */
  children?: React.ReactNode;

  /** *Optional* - Pads the top of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
  topPad?: boolean;

  /** *Optional* - Pads the bottom of the input (similar to the TextField, Dropdown, or Multiselect inputs) */
  botPad?: boolean;

  /** *Optional* - Color to use for the button */
  color?: ColorType;

  /** *Optional* - Color value (shade, hue) to use for the button */
  colorHue?: string;

  /** *Optional* - Variant of button to display */
  variant?: "default" | "outlined" | "minimal";
}

export default function Button(props: Props) {

  const styles = {
    id: props.id || undefined,
    className: props.className || undefined,
  };

  const colorType: ColorType = props.color || "grey"
  const colorHue = props.colorHue || "500"
  const color = colors[colorType][colorHue]

  const variant = props.variant || "default"
  let hoverColor = 'white'
  if(variant === "default") {
    hoverColor = getHoverColor(colorType, colorHue)
  }
  if(variant === "outlined") {
    hoverColor = colors[colorType]["50"]
  }

  return (
    <Base>
        { props.topPad && <TopPad>hidden</TopPad> }
        <ButtonBase 
          color={color}
          variant={variant}
          textColor={getTextColor(colorType, colorHue)} 
          hoverColor={hoverColor}
          {...styles}
        >{props.children}</ButtonBase>
        { props.botPad && <BotPad>hidden</BotPad> }
    </Base>
  );
}
