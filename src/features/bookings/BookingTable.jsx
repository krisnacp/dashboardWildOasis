import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";

import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

function BookingTable() {
    const paginationRange = 10;
    const { loadingAllBookings, bookings } = useBookings(paginationRange);
    const bookingLength = bookings?.data.length;

    if (loadingAllBookings) return <Spinner />;
    if (!bookings?.data.length) return <Empty resource="bookings" />;

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                <Table.Body
                    data={bookings?.data}
                    render={(booking) => (
                        <BookingRow key={booking.id} booking={booking} />
                    )}
                />
                <Table.Footer>
                    <Pagination
                        range={paginationRange}
                        bookingLength={bookingLength}
                        count={bookings?.count}
                    />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;

// !sorting logic
// ?membuat logic untuk fitur filter berdasarkan status
// let statusVariable;
// if (statusParams === "all") {
//     statusVariable = bookings;
// }
// if (statusParams === "checked-out") {
//     statusVariable = bookings?.filter(
//         (booking) => booking.status === statusParams,
//     );
// }
// if (statusParams === "checked-in") {
//     statusVariable = bookings?.filter(
//         (booking) => booking.status === statusParams,
//     );
// }
// if (statusParams === "unconfirmed") {
//     statusVariable = bookings?.filter(
//         (booking) => booking.status === statusParams,
//     );
// }

// // ?membuat logic untuk fitur sorting filter
// const [category, order] = sortByParams
//     ? sortByParams.split("-")
//     : [undefined, undefined];
// const orderDirection = order === "asc" ? 1 : -1;
// function compareText(a, b) {
//     if (a[category]?.toLowerCase() < b[category]?.toLowerCase()) {
//         return -1 * orderDirection;
//     }
//     if (a[category]?.toLowerCase() > b[category]?.toLowerCase()) {
//         return 1 * orderDirection;
//     }
//     return 0;
// }
// function compareNumbers(a, b) {
//     return (a[category] - b[category]) * orderDirection;
// }
// const sortingVariable =
//     typeof bookings?.at(0)[category] === "number"
//         ? (!statusParams ? bookings : statusVariable)?.sort(compareNumbers)
//         : (!statusParams ? bookings : statusVariable)?.sort(compareText);
