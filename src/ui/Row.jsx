import styled, { css } from "styled-components";

const Row = styled.div`
    display: flex;

    /* horizontal */
    ${(props) =>
        props.type === "horizontal" &&
        css`
            justify-content: space-between;
            align-items: center;
        `}

    /* vertical */
    ${(props) =>
        props.type === "vertical" &&
        css`
            flex-direction: column;
            gap: 1.6rem;
        `}
`;

// way to set default 'type' props
Row.defaultProps = {
    type: "horizontal",
};

export default Row;
