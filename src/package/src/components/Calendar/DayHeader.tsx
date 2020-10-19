import React from "react";
import { DayHeaderContainer } from "./style";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export default function DayHeader() {
    return (
        <DayHeaderContainer>
            {daysOfWeek.map((dayName: string, idx: number) => (
                <div key={idx}>{dayName}</div>
            ))}
        </DayHeaderContainer>
    );
}
