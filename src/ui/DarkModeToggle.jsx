import { BiMoon, BiSun } from "react-icons/bi";

import { useDarkModeStateContext } from "../context/DarkModeContext";

import ButtonIcon from "./ButtonIcon";

function DarkModeToggle() {
    const { modeState, toggleMode } = useDarkModeStateContext();
    return (
        <ButtonIcon onClick={() => toggleMode()}>
            {modeState ? <BiMoon /> : <BiSun />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
