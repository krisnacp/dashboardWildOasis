import { BiLogOut } from "react-icons/bi";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
    const { loadingLogout, mutateLogout } = useLogout();

    function handleClickLogout() {
        mutateLogout();
    }

    return (
        <ButtonIcon onClick={handleClickLogout} disabled={loadingLogout}>
            {loadingLogout ? <SpinnerMini /> : <BiLogOut />}
        </ButtonIcon>
    );
}

export default Logout;
