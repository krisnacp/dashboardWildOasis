import { useQuery } from "@tanstack/react-query";

import { getBooking } from "../../services/apiBookings";

export function useBooking(bookingId) {
    const { isLoading: loadingBooking, data: booking } = useQuery({
        queryKey: ["bookings", bookingId],
        queryFn: () => getBooking(bookingId),
    });

    return { loadingBooking, booking };
}
