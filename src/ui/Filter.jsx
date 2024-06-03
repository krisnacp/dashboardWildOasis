import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
    border: 1px solid var(--color-grey-100);
    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-grey-0);
    border: none;

    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

Filter.propTypes = {
    filterField: PropTypes.string,
    options: PropTypes.array,
};
function Filter({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    // memanfaatkan searchParams untuk melihat state active tombol filter
    const currentFilter = searchParams.get(filterField);

    function handleClick(value) {
        searchParams.set(filterField, value);
        // tambahan program untuk mereset pagination agar tidak terjadi bug saat filer lain diterapkan
        if (searchParams.get("limit")) {
            searchParams.set("limit", 0);
        }
        setSearchParams(searchParams);
    }

    return (
        <StyledFilter>
            {options.map((option) => {
                return (
                    <FilterButton
                        key={option.label}
                        onClick={() => handleClick(option.value)}
                        active={
                            option.value === currentFilter
                                ? option.value === currentFilter
                                : undefined
                        }
                        disabled={option.value === currentFilter}
                    >
                        {option.label}
                    </FilterButton>
                );
            })}
        </StyledFilter>
    );
}

export default Filter;

// <FilterButton onClick={() => handleClick("all")}>
//     {/* <Link to="?filter=all">All</Link> */}
//     All
// </FilterButton>
// <FilterButton onClick={() => handleClick("no-discount")}>
//     {/* <Link to="?filter=no-discount">No Discount</Link> */}
//     No Discount
// </FilterButton>
// <FilterButton onClick={() => handleClick("discount")}>
//     {/* <Link to="?filter=discount">Discount</Link> */}
//     Discount
// </FilterButton>
