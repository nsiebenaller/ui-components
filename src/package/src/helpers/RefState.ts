import React, { useRef, useState } from "react";

/**
 * Creates a sharable version of state
 *
 * Returns an array which the first value is a container
 * of the current state, the second value is a handler
 * that can be used to modify this value
 */
type RefState<T> = [React.MutableRefObject<T>, (value: T) => void];
export default function useRefState<T>(initState: T): RefState<T> {
    const [innerValue, setInnerValue] = useState<T>(initState);
    const ref = useRef<T>(innerValue);
    const setValue = (value: T) => {
        ref.current = value;
        setInnerValue(value);
    };
    return [ref, setValue];
}
