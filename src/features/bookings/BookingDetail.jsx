import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import { useBooking } from "./useBooking";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

import { useMoveBack } from "../../hooks/useMoveBack";
import useCheckout from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    let { id } = useParams();
    const paramsId = Number(id);
    const { loadingBooking, booking } = useBooking(paramsId);
    const status = booking?.status;
    const { loadingCheckout, mutateCheckout } = useCheckout();
    const { loadingDeleteBooking, mutateDeleteBooking } = useDeleteBooking();
    const navigate = useNavigate();

    const moveBack = useMoveBack();

    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    if (loadingBooking) return <Spinner />;
    if (!booking) return <Empty resourceName="booking" />;

    function handleCheckin() {
        navigate(`/checkin/${booking.id}`);
    }

    function handleCheckout() {
        if (status !== "checked-in") return;
        mutateCheckout(booking.id);
    }

    function handleDeleteBooking() {
        if (status !== "checked-out") return;
        mutateDeleteBooking(booking.id, {
            onSettled: () => {
                navigate(-1);
            },
        });
    }

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{id}</Heading>
                    <Tag type={statusToTagName[status]}>
                        {status.replace("-", " ")}
                    </Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <Modal>
                <ButtonGroup>
                    {/* check in button */}
                    {status === "unconfirmed" && (
                        <Button onClick={handleCheckin}>
                            Check in #{booking.id}
                        </Button>
                    )}

                    {/* check out button */}
                    {status === "checked-in" && (
                        <Button
                            onClick={handleCheckout}
                            disabled={loadingCheckout}
                        >
                            Check out booking #{booking.id}
                        </Button>
                    )}

                    {/* delte button */}
                    <Modal.Open opens="deleteBooking">
                        <Button variation="danger">
                            Delete booking #{booking.id}
                        </Button>
                    </Modal.Open>

                    {/* back button */}
                    <Button variation="secondary" onClick={moveBack}>
                        Back
                    </Button>
                </ButtonGroup>

                <Modal.Window name="deleteBooking">
                    <ConfirmDelete
                        disabled={loadingDeleteBooking}
                        resourceName="deleteBooking"
                        onConfirm={() => handleDeleteBooking()}
                    />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default BookingDetail;
