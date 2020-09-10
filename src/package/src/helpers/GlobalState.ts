import uniqueId from "./uniqueId";

class GlobalState {
    state: any;
    constructor() {
        this.state = {
            open: false,
            modalRef: null,
            calendarRef: null,
        };
    }

    /* Whether a dropdown is open, used to prevent multiples to be open at one time */
    setOpen = (value: boolean) => (this.state.open = value);
    isOpen = () => this.state.open;

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
