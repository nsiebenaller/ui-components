import colors from "../../colors";
const { grey, red } = colors;

export const multiselectOption = `
    > span {
        padding-left: 5px;
    }
`;

export const allOption = `
    > b {
        padding-left: 5px;
    }
`;

export const stickyAll = `
    position: sticky;
    top: 0;
    z-index: 1;
    padding-top: 10px;
    border-bottom: 1px solid ${grey[300]};
`;

export const multiselectList = `
    padding-top: 0 !important;
`;
