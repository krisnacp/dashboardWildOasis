import styled from "styled-components";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

// CheckinBooking.PropTypes ={

// }
function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [breakfast, setBreakfast] = useState(false);
    let { id } = useParams();
    const paramsId = Number(id);
    const { loadingBooking, booking } = useBooking(paramsId);
    const { loadingCheckin, mutateCheckin } = useCheckin();
    const { loadingAllSettings, settings } = useSettings();

    useEffect(() => {
        setConfirmPaid(booking?.isPaid ?? false);
        setBreakfast(booking?.hasBreakfast ?? false);
    }, [booking?.isPaid, booking?.hasBreakfast]);

    const moveBack = useMoveBack();
    if (loadingBooking || loadingAllSettings) return <Spinner />;

    const {
        id: bookingId,
        guests: { fullName },
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
    } = booking;

    const optionalBreakfastPrice =
        settings?.breakfastPrice * numNights * numGuests;

    function handleChangeBreakfast() {
        setBreakfast((prev) => !prev);
    }

    function handleChangePaid() {
        setConfirmPaid((prev) => !prev);
    }

    function handleCheckin() {
        if (!confirmPaid) return;
        const checkingInOut = !breakfast
            ? {
                  ...booking,
                  isPaid: confirmPaid,
                  status: "checked-in",
              }
            : {
                  ...booking,
                  isPaid: confirmPaid,
                  status: "checked-in",
                  hasBreakfast: breakfast,
                  extrasPrice: optionalBreakfastPrice,
                  totalPrice: booking?.totalPrice + optionalBreakfastPrice,
              };
        delete checkingInOut.cabins;
        delete checkingInOut.guests;
        mutateCheckin({ bookingId, checkingInOut });
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {/* breakfast checkbox */}
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={breakfast}
                        onChange={() => handleChangeBreakfast()}
                        id={"breakfast"}
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(optionalBreakfastPrice)}
                    </Checkbox>
                </Box>
            )}

            {/* payment confirmation checkbox */}
            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => handleChangePaid()}
                    disabled={confirmPaid}
                    id={"confirmed"}
                >
                    {!breakfast
                        ? `I confirm that ${fullName} has paid the total amount of ${formatCurrency(
                              totalPrice,
                          )}`
                        : `I confirm that ${fullName} has paid the total amount of
                    ${formatCurrency(
                        totalPrice + optionalBreakfastPrice,
                    )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice,
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || loadingCheckin}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
