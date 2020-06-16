import React from "react";
import { Base, InputBase, ButtonContainer, Label, Error } from "./style";

export default function Datepicker() {
  return (
    <Base>
      <Label visible>label</Label>
      <InputBase>
        <input placeholder={"MM"} />
        <div>/</div>
        <input placeholder={"DD"} />
        <div>/</div>
        <input placeholder={"YYYY"} />
        <ButtonContainer>
          <button>date</button>
        </ButtonContainer>
      </InputBase>
      <Error visible>error</Error>
    </Base>
  );
}
