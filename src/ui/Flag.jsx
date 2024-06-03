import PropTypes from "prop-types";
import styled from "styled-components";
// import { hasFlag } from "country-flag-icons";
// import { CountryFlagIcons } from "country-flag-icons";
// import { US } from "country-flag-icons/react/3x2";
// import X from "country-flag-icons/react/3x2";

export const StyledFlag = styled.img`
    max-width: 2rem;
    /* width: 50px;
    height: 30px; */
    border-radius: var(--border-radius-tiny);
    display: block;
    border: 1px solid var(--color-grey-100);
`;
Flag.propTypes = {
    src: PropTypes.string,
    // alt: PropTypes.string,
};
function Flag({
    src,
    // alt
}) {
    // console.log(src.toUpperCase());
    // const flag = hasFlag(src.toUpperCase()) === true;
    // hasFlag("US") === true;
    // getUnicodeFlagIcon("US") === "🇺🇸";
    // console.log(hasFlag("US"));
    // console.log(getUnicodeFlagIcon("US"));
    // console.log(X);

    return (
        <>
            <span className={`fi fi-${src}`} />
        </>
    );
}

export default Flag;
