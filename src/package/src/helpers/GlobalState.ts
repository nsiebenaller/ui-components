class GlobalState {
    state: any;
    constructor() {
        this.state = {
            open: false,
        };
    }
    setOpen = (value: boolean) => (this.state.open = value);
    isOpen = () => this.state.open;
}
export default new GlobalState();
