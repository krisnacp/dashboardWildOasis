import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    // men-set defauklt queryParameter jika value dari parametenya tidak ada
    const numDays = !searchParams.get("last")
        ? 7
        : Number(searchParams.get("last"));

    // variable untuk menconvert/menghitung dari numDays yang didapat dari queryParams menjadi bentuk ISOString days
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isLoading: loadingRecentBookings, data: bookings } = useQuery({
        queryKey: ["bookings", `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate),
    });

    return { loadingRecentBookings, bookings };
}
