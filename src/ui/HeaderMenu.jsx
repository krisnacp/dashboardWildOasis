import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

function HeaderMenu() {
    const navigate = useNavigate();

    function handleClickUser() {
        navigate("/account");
    }

    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={handleClickUser}>
                    <BiUserCircle />
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
            <li>
                <DarkModeToggle />
            </li>
        </StyledHeaderMenu>
    );
}

export default HeaderMenu;
