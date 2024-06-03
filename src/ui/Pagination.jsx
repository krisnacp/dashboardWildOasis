import styled from "styled-components";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
    color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;
Pagination.propTypes = {
    range: PropTypes.number,
    bookingLength: PropTypes.number,
    count: PropTypes.number,
};
function Pagination({ range = 0, bookingLength, count }) {
    // console.log(range);
    const [searchParams, setSearchParams] = useSearchParams();
    const limitParams = Number(searchParams.get("limit"));
    // console.log(typeof limitParams, limitParams);

    function handlePreviousClick() {
        if (!limitParams || limitParams === 0) return false;
        const sum = limitParams - range;
        searchParams.set("limit", sum);
        setSearchParams(searchParams);
    }
    function handleNextClick() {
        if (bookingLength - range !== 0) return;
        const sum = limitParams + range;
        searchParams.set("limit", sum);
        setSearchParams(searchParams);
    }
    const startRange =
        !limitParams || limitParams === 0
            ? Math.abs(Math.floor(range / range))
            : limitParams + 1;
    const endRange =
        !limitParams || limitParams === 0
            ? range
            : bookingLength - range !== 0
            ? count
            : range + limitParams;

    if ((bookingLength - range !== 0 && !range) || range >= count) return null;
    return (
        <StyledPagination>
            <P>
                Showing <span> {startRange} </span>to <span> {endRange} </span>{" "}
                of <span>{count}</span> results
            </P>
            <Buttons>
                {/* prev button */}
                <PaginationButton
                    onClick={() => handlePreviousClick()}
                    disabled={!limitParams || limitParams === 0}
                >
                    <BiChevronLeft /> Previous
                </PaginationButton>
                {/* next button */}
                <PaginationButton
                    onClick={() => handleNextClick()}
                    disabled={bookingLength - range !== 0}
                >
                    Next <BiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}

export default Pagination;
