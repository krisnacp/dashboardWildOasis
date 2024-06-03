import PropTypes from "prop-types";
import {
    cloneElement,
    createContext,
    useContext,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { BiSolidXSquare } from "react-icons/bi";

import useClickOutside from "../hooks/useClickOutside";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

// instansiasi context untuk Modal
const ModalContext = createContext();

// membuat kerangka pembangun "Compound Component"
Open.propTypes = {
    opens: PropTypes.string,
    children: PropTypes.node,
};
// TODO: component bagian open modal
function Open({ children, opens: opensWindowName }) {
    // menggunakan context value, "open" function yang sudah dibuat
    const { open } = useContext(ModalContext);
    // karena pada component Open akan menggunakan tombol dan diterapkan function untuk membuka modal-nya, maka dari itu, karena function untuk membuka modal tidak bisa ditempelkan pada tombol/button yang nantinya akan dibuat di mana element componenet modal dipanggil, dibuatlah element clone dari child component dari Modal, menggunakan method cloneElement()
    return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Window.propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
};
// TODO: component bagian window modal
function Window({ children, name }) {
    const { openName, close } = useContext(ModalContext);
    const ref = useRef();
    useClickOutside(ref, close);
    if (name !== openName) return null;
    // dalam penyempurnaan implementasi fitur modal pada react, karena componenet yang digunakan akan menjadi 'reuseable component' method atau function createPortal() dari 'react-dom' digunakan. createPortal() memiliki fungsi untuk memisahkan element yang dipilih agar keluar dari struktur dom aplikasi, hal tersebut dilakukan untuk menghindari conflict dengan styling css pada parent component seperti [overflow: hidden], atau styling css yang lain yang berkaitan dengan conflict modal.
    return createPortal(
        <Overlay>
            <StyledModal ref={ref}>
                <Button onClick={close}>
                    <BiSolidXSquare />
                </Button>
                <>{cloneElement(children, { onCloseModal: close })}</>
            </StyledModal>
        </Overlay>,
        document.body,
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};
// dalam rangka untuk memperbaiki kinerja program dan menghindari bug, akan dilakukan refactoring dari component ui 'Modal' menggunakan teknik "Compound Component"
function Modal({ children }) {
    // refactoring program karena perubahan bentuk component menjadi "Compound Component"
    const [openName, setOpenName] = useState("");
    const close = () => setOpenName("");
    const open = (args) => setOpenName(args);
    // console.log(openName);
    return (
        <ModalContext.Provider value={{ openName, close, open }}>
            <span>{children}</span>
        </ModalContext.Provider>
    );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
