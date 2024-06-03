import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getAllBookings } from "../../services/apiBookings";

export function useBookings(range) {
    // useQueryClient digunakan untuk method chaining dengan prefetchQuery
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();
    const statusParams = searchParams.get("status");
    const sortByParams = searchParams.get("sortBy");
    const limitParams = Number(searchParams.get("limit"));
    const startRange =
        !limitParams || limitParams === 0
            ? Math.abs(Math.floor(range - range))
            : limitParams;
    const endRange =
        !limitParams || limitParams === 0 ? range - 1 : range + limitParams - 1;
    const [field, order] = sortByParams
        ? sortByParams.split("-")
        : [undefined, undefined];
    const { isLoading: loadingAllBookings, data: bookings } = useQuery({
        queryKey: ["bookings", statusParams, sortByParams, limitParams],
        queryFn: () =>
            getAllBookings(
                "status",
                statusParams,
                field,
                order,
                range,
                startRange,
                endRange,
            ),
    });

    // memanfaatkan fitur pre-fetching untuk memperbagus UX dari sisi user, pada kasus ini, method yang digunakan adalah dasar dari pattern prefetching
    if (startRange < startRange + range) {
        queryClient.prefetchQuery({
            queryKey: [
                "bookings",
                statusParams,
                sortByParams,
                limitParams + range,
            ],
            queryFn: () =>
                getAllBookings(
                    "status",
                    statusParams,
                    field,
                    order,
                    range,
                    startRange + range,
                    endRange + range,
                ),
        });
    }
    if (startRange > startRange - range) {
        queryClient.prefetchQuery({
            queryKey: [
                "bookings",
                statusParams,
                sortByParams,
                limitParams - range,
            ],
            queryFn: () =>
                getAllBookings(
                    "status",
                    statusParams,
                    field,
                    order,
                    range,
                    startRange - range,
                    endRange - range,
                ),
        });
    }

    return { loadingAllBookings, bookings };
}
