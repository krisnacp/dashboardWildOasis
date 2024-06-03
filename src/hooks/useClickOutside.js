import PropTypes from "prop-types";
import { useEffect, useCallback } from "react";

useClickOutside.propTypes = {
    handler: PropTypes.func,
};
export default function useClickOutside(ref, handler, listenCapturing = true) {
    let handleClick;
    handleClick = useCallback(
        (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handler?.();
            }
        },
        [handler, ref],
    );

    useEffect(() => {
        document.addEventListener("click", handleClick, listenCapturing);

        return () => {
            document.removeEventListener("click", handleClick, listenCapturing);
        };
    }, [handleClick, listenCapturing]);
}
