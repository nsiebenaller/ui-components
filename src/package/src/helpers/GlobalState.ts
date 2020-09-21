import uniqueId from "./uniqueId";
import DomUtil from "./DomUtil";

export interface ISelect {
    id?: string;
    tabPressRef: React.MutableRefObject<boolean>;
    openRef: React.MutableRefObject<boolean>;
    propsRef: React.MutableRefObject<any>;
    listRef: React.RefObject<HTMLDivElement>;
    inputRef: React.RefObject<HTMLInputElement>;
    toggleClose: () => void;
    toggleOpen: () => void;
}

type CalendarRef = React.RefObject<HTMLDivElement> | undefined;
interface IGlobalState {
    selects: Array<ISelect>;
    registered: boolean;
    modalHook: HTMLDivElement | undefined;
    calendarRef: CalendarRef;
}
class GlobalState {
    state: IGlobalState;
    constructor() {
        this.state = {
            selects: [], // Array of all active select components
            registered: false, // Whether the global select click handler is registered
            modalHook: undefined, // Hook to a dom element where modals are rendered into
            calendarRef: undefined, // Ref to a currently opened calendar element
        };
    }

    registerListener = (select: ISelect): string => {
        const { registered } = this.state;
        // Add Select
        const id = uniqueId();
        this.state.selects.push({ id, ...select });

        // Register Listener
        if (registered) return id;
        document.addEventListener("click", this.clickListener, true);
        window.addEventListener("resize", this.resizeListener);
        window.addEventListener("scroll", this.resizeListener, true);
        document.addEventListener("keydown", this.keyDownListener, true);
        this.state.registered = true;
        return id;
    };
    removeListener = (id: string | undefined) => {
        if (!id) return;
        const { selects } = this.state;
        this.state.selects = selects.filter((x) => x.id !== id);
    };
    clickListener = (e: MouseEvent) => {
        const { selects } = this.state;
        const openFns = new Array<() => void>();
        const closeFns = new Array<() => void>();
        let isContained = false;
        selects.forEach((select: ISelect) => {
            const {
                openRef: { current: open },
                propsRef: { current: props },
                listRef,
                inputRef,
                toggleClose,
                toggleOpen,
            } = select;
            if (!props) return;

            // Prevent clicking "through" the datepicker's calendar
            if (this.calendarOverlaps(e)) {
                return;
            }

            // Check if click is within the input or list
            const clickedInput = DomUtil.eventContained(e, inputRef.current);
            const clickedList = DomUtil.eventContained(e, listRef.current);

            // Check if opened
            if ((clickedInput || clickedList) && open) {
                isContained = true;
            }

            // Auto close if applicable
            if (props.autoClose && open && clickedList) {
                closeFns.push(toggleClose);
                return;
            }

            // Open if click event is within input
            if (!open && clickedInput) {
                openFns.push(toggleOpen);
                return;
            }

            // Close if clicked outside
            if (open && !clickedInput && !clickedList) {
                closeFns.push(toggleClose);
                return;
            }
        });
        closeFns.forEach((fn) => fn());
        if (!isContained) {
            openFns.forEach((fn) => fn());
        }
    };
    resizeListener = () => {
        const { selects } = this.state;
        selects.forEach((select: ISelect) => {
            const {
                openRef: { current: open },
                propsRef: { current: props },
                listRef,
                inputRef,
            } = select;
            if (!open || !props) return;
            DomUtil.positionElement(inputRef.current, listRef.current, {
                positionBelow: props.allowInput,
                allowOverflow: props.noWrap,
            });
        });
    };
    keyDownListener = (e: KeyboardEvent) => {
        const { selects } = this.state;
        selects.forEach((select: ISelect) => {
            const { tabPressRef, openRef, toggleClose } = select;
            const tabPressed = e.key === "Tab";
            tabPressRef.current = tabPressed;
            if (tabPressed && openRef.current) {
                toggleClose();
            }
        });
    };

    getModalHook = () => {
        if (!this.state.modalHook) {
            const ref = document.createElement("div");
            ref.id = uniqueId("modals");
            document.getElementsByTagName("html")[0].appendChild(ref);
            this.state.modalHook = ref;
        }
        return this.state.modalHook;
    };

    setCalendarRef = (calendarRef: CalendarRef) => {
        this.state.calendarRef = calendarRef;
    };

    calendarOverlaps = (e: MouseEvent): boolean => {
        const { calendarRef } = this.state;
        if (!calendarRef || !calendarRef.current) return false;
        return DomUtil.eventContained(e, calendarRef.current);
    };
}
export default new GlobalState();
