import PropTypes from "prop-types";
import { createContext, useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import styled from "styled-components";
import useClickOutside from "../hooks/useClickOutside";

const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* position: relative; */
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
    z-index: 99;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

const MenusContext = createContext();

Menu.propTypes = {
    children: PropTypes.node,
};
function Menu({ children }) {
    return <StyledMenu>{children}</StyledMenu>;
}

Toggle.propTypes = {
    children: PropTypes.node,
    id: PropTypes.number,
};
function Toggle({ children, id }) {
    const { openId, close, open, setPosition } = useContext(MenusContext);

    function handleClick(e) {
        e.stopPropagation();
        const rect = e.target.closest("button").getBoundingClientRect(); // men-track atau melacak posisi dari button yang digunakan sebagai triggrel/toggle click sebagai acuan penempatan list dari fitur tombol delete, duplicate, dan edit (component List), menaggunakan chaining event method seperti diatas hingga mendapat posisi x, y, innerWidth, dan informasi lainnya di dalam window
        // console.log(rect);
        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 8,
        }); // setelah itu informasi yang didapat dari posisi button dioperasikan dan di-pass ke state pada parent component yang nanatinya digunaka di List Component sebagai posisi penempatan fitur. Hasi; bisa dilihat di halaman
        openId === "" || openId !== id ? open(id) : close();
    }
    // console.log(id);
    return (
        <StyledToggle onClick={(e) => handleClick(e)}>
            {children}
            <BiDotsVerticalRounded />
        </StyledToggle>
    );
}

List.propTypes = {
    children: PropTypes.node,
    id: PropTypes.number,
};
function List({ children, id }) {
    const ref = useRef();
    const { openId, position, close } = useContext(MenusContext);
    useClickOutside(ref, close, false);
    if (openId !== id) return null;
    return createPortal(
        <StyledList position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body,
    );
    // return <StyledList position={position}>{children}</StyledList>;
}

Button.propTypes = {
    children: PropTypes.node,
    icon: PropTypes.node,
    onClick: PropTypes.func,
    loading: PropTypes.bool,
};
function Button({ children, icon, onClick, loading }) {
    const { close } = useContext(MenusContext);
    function handleClick() {
        onClick?.();
        close();
    }
    return (
        <li disabled={loading}>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.propTypes = {
    children: PropTypes.node,
};
function Menus({ children }) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const close = () => setOpenId("");
    const open = (args) => setOpenId(args);
    return (
        <MenusContext.Provider
            value={{ close, open, openId, position, setPosition }}
        >
            <div>{children}</div>
        </MenusContext.Provider>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
