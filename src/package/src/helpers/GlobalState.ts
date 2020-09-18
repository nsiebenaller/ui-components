import uniqueId from "./uniqueId";

class GlobalState {
    state: any;
    constructor() {
        this.state = {
            isAutoClose: false, // Whether the last opened select is autoClose
            open: false, // Whether a select is currently open
            modalRef: null, // Ref to a dom element where modals are rendered into
            calendarRef: null, // Ref to a currently opened calendar element
        };
    }

    /* Handlers for Select component, used to prevent multiples to be open at one time */
    setOpen = (value: boolean) => (this.state.open = value);
    isOpen = (): boolean => this.state.open;
    setAutoClose = (value: boolean) => (this.state.isAutoClose = value);
    isAutoClose = (): boolean => this.state.isAutoClose;

    getModalRef = () => {
        if (!this.state.modalRef) {
            const ref = document.createElement("div");
            ref.id = uniqueId("modals");
            document.getElementsByTagName("html")[0].appendChild(ref);
            this.state.modalRef = ref;
        }
        return this.state.modalRef;
    };

    setCalendarRef = (
        calendarRef: React.RefObject<HTMLDivElement> | undefined
    ) => (this.state.calendarRef = calendarRef);

    calendarOverlaps = (e: MouseEvent): boolean => {
        const { calendarRef } = this.state;
        if (!calendarRef || !calendarRef.current) return false;
        const domRect: DOMRect = calendarRef.current.getBoundingClientRect();
        return (
            domRect.left <= e.clientX &&
            domRect.left + domRect.width >= e.clientX &&
            domRect.top <= e.clientY &&
            domRect.top + domRect.height >= e.clientY
        );
    };
}
export default new GlobalState();
