import {
    createContext,
    useContext,
    useEffect,
    // useState
} from "react";
import PropTypes from "prop-types";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeStateContext = createContext();

export function useDarkModeStateContext() {
    const context = useContext(DarkModeStateContext);
    if (context === undefined)
        throw new Error(
            "This context is used outside of  <DarkModeStateContext.Provider>",
        );
    return context;
}

DarkModeContext.propTypes = {
    children: PropTypes.node,
};
function DarkModeContext({ children }) {
    // banyak cara untuk me-manage state, salah satunya adalah menggunakan custom hook
    const [modeState, setModeState] = useLocalStorageState(
        window.matchMedia("prefers-color-scheme: dark").matches,
        "darkMode",
    );

    // logic untuk menempelkan dark mode class pada root element
    useEffect(() => {
        if (modeState) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [modeState]);

    function toggleMode() {
        setModeState((prev) => !prev);
    }
    return (
        <DarkModeStateContext.Provider value={{ modeState, toggleMode }}>
            {children}
        </DarkModeStateContext.Provider>
    );
}

export default DarkModeContext;
