import styled from "styled-components";
import { format, isToday } from "date-fns";
import PropTypes from "prop-types";
import {
    BiShow,
    BiSolidDownArrowSquare,
    BiSolidUpArrowSquare,
    BiTrash,
} from "react-icons/bi";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

BookingRow.propTypes = {
    booking: PropTypes.object,
};
function BookingRow({
    booking: {
        id: bookingId,
        // created_at,
        startDate,
        endDate,
        numNights,
        // numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    },
}) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const { loadingCheckout, mutateCheckout } = useCheckout();
    const { loadingDeleteBooking, mutateDeleteBooking } = useDeleteBooking();

    const navigate = useNavigate();

    function handleClickDetails() {
        navigate(`${bookingId}`);
    }

    function handleClickCheckIn() {
        navigate(`/checkin/${bookingId}`);
    }

    function handleClickCheckOut() {
        mutateCheckout(bookingId);
    }

    function handleDeleteBooking() {
        mutateDeleteBooking(bookingId);
    }

    return (
        <Modal>
            <Table.Row>
                <Cabin>{cabinName}</Cabin>

                <Stacked>
                    <span>{guestName}</span>
                    <span>{email}</span>
                </Stacked>

                <Stacked>
                    <span>
                        {isToday(new Date(startDate))
                            ? "Today"
                            : formatDistanceFromNow(startDate)}{" "}
                        &rarr; {numNights} night stay
                    </span>
                    <span>
                        {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                        {format(new Date(endDate), "MMM dd yyyy")}
                    </span>
                </Stacked>

                <Tag type={statusToTagName[status]}>
                    {status.replace("-", " ")}
                </Tag>

                <Amount>{formatCurrency(totalPrice)}</Amount>

                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId} key={bookingId}>
                        {/* see details button */}
                        <Menus.Button
                            icon={<BiShow />}
                            onClick={() => handleClickDetails()}
                            loading={loadingCheckout}
                        >
                            See Details
                        </Menus.Button>

                        {/* check-in button */}
                        {status === "unconfirmed" && (
                            <Menus.Button
                                icon={<BiSolidDownArrowSquare />}
                                onClick={() => handleClickCheckIn()}
                            >
                                Check In
                            </Menus.Button>
                        )}

                        {/* check-out button */}
                        {status === "checked-in" && (
                            <Menus.Button
                                icon={<BiSolidUpArrowSquare />}
                                onClick={() => handleClickCheckOut()}
                                loading={loadingCheckout}
                            >
                                Check Out
                            </Menus.Button>
                        )}

                        {/* delete booking button */}
                        {status === "checked-out" && (
                            <Modal.Open opens="delete">
                                <Menus.Button
                                    icon={<BiTrash />}
                                    loading={loadingDeleteBooking}
                                >
                                    Delete Booking
                                </Menus.Button>
                            </Modal.Open>
                        )}
                    </Menus.List>
                </Menus.Menu>
                <Modal.Window name="delete">
                    <ConfirmDelete
                        resourceName="booking"
                        onConfirm={() => handleDeleteBooking()}
                    />
                </Modal.Window>
            </Table.Row>
        </Modal>
    );
}

export default BookingRow;
