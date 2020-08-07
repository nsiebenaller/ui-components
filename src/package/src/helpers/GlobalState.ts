import uniqueId from "./uniqueId";

class GlobalState {
    state: any;
    constructor() {
        this.state = {
            open: false,
            modalRef: null,
        };
    }
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
}
export default new GlobalState();
