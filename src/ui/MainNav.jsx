import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { BiHomeAlt } from "react-icons/bi";
import { BiCalendarCheck } from "react-icons/bi";
import { BiHotel } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import { BiCog } from "react-icons/bi";

const NavList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

// *jika kita akan membuat styledComponent menggunakan element yang bukan dari HTML, maka penulisan methodnya adalah sebagai berikut [styled(NavLink)]. contohnya bisa dilihat dibawah
const StyledNavLink = styled(NavLink)`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        color: var(--color-grey-600);
        font-size: 1.6rem;
        font-weight: 500;
        padding: 1.2rem 2.4rem;
        transition: all 0.3s;
    }

    /* This works because react-router places the active class on the active NavLink */
    &:hover,
    &:active,
    &.active:link,
    &.active:visited {
        color: var(--color-grey-800);
        background-color: var(--color-grey-50);
        border-radius: var(--border-radius-sm);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }

    &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg {
        color: var(--color-brand-600);
    }
`;

function MainNav() {
    return (
        <NavList>
            <li>
                <StyledNavLink to="dashboard">
                    <BiHomeAlt />
                    <span>Home</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="bookings">
                    <BiCalendarCheck />
                    <span>Bookings</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="cabins">
                    <BiHotel />
                    <span>Cabins</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="users">
                    <BiUser />
                    <span>Users</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="settings">
                    <BiCog />
                    <span>Setting</span>
                </StyledNavLink>
            </li>
        </NavList>
    );
}

export default MainNav;
