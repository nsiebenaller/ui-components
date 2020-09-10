function eventContained(
    event: MouseEvent,
    element: Element | HTMLInputElement | HTMLDivElement | null | undefined
): boolean {
    if (!element) return false;
    const domRect: DOMRect = element.getBoundingClientRect();
    return (
        domRect.left <= event.clientX &&
        domRect.left + domRect.width >= event.clientX && // X contained
        domRect.top <= event.clientY &&
        domRect.top + domRect.height >= event.clientY // Y contained
    );
}

interface PositionOptions {
    positionBelow?: boolean;
    allowOverflow?: boolean;
}
function positionElement(
    root: HTMLDivElement | null,
    element: HTMLDivElement | null,
    options: PositionOptions
) {
    if (!root || !element) return;
    const domRect: DOMRect = root.getBoundingClientRect();
    const windowScrollY = window.scrollY || window.pageYOffset || 0;
    const windowScrollX = window.scrollX || window.pageXOffset || 0;
    const topStyle = options.positionBelow ? domRect.height : 0;
    const widthStyle = options.allowOverflow
        ? "auto"
        : `${root.offsetWidth - 2}px`;
    const minWidthStyle = options.allowOverflow
        ? `${root.offsetWidth - 2}px`
        : "auto";

    element.style.top = `${topStyle + domRect.top + windowScrollY}px`;
    element.style.left = `${domRect.left + windowScrollX}px`;
    element.style.width = widthStyle;
    element.style.minWidth = minWidthStyle;
}

function isLetter(e: KeyboardEvent): boolean {
    return e.keyCode >= 65 && e.keyCode <= 90;
}

function isNumber(e: KeyboardEvent): boolean {
    return e.keyCode >= 48 && e.keyCode <= 57;
}

function isSpace(e: KeyboardEvent): boolean {
    return e.keyCode === 32;
}

const DomUtil = {
    eventContained,
    positionElement,
    isLetter,
    isNumber,
    isSpace,
};
export default DomUtil;
