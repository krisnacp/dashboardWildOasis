import PropTypes from "prop-types";

import Button from "../../ui/Button";
import useCheckout from "./useCheckout";

CheckoutButton.propTypes = {
    bookingId: PropTypes.number,
};
function CheckoutButton({ bookingId }) {
    const { loadingCheckout, mutateCheckout } = useCheckout();

    function handleClickCheckout() {
        mutateCheckout(bookingId);
    }
    return (
        <Button
            variation="primary"
            size="small"
            disabled={loadingCheckout}
            onClick={handleClickCheckout}
        >
            Check out
        </Button>
    );
}

export default CheckoutButton;
