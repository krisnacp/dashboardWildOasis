import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";

// import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 34rem auto;
    gap: 2.4rem;
`;

function DashboardLayout() {
    const { loadingRecentBookings, bookings } = useRecentBookings();
    const { loadingRecentStays, confirmedStays, numDays } = useRecentStays();
    const { loadingAllCabins, cabins } = useCabins();

    // if (loadingRecentBookings || loadingRecentStays || loadingAllCabins)
    //     return <Spinner />;
    // console.log(bookings, stays);

    return (
        <StyledDashboardLayout>
            {/* <div>Statistics</div> */}
            <Stats
                loadingStates={
                    loadingRecentBookings ||
                    loadingRecentStays ||
                    loadingAllCabins
                }
                bookings={bookings}
                confirmStays={confirmedStays}
                numDays={numDays}
                // cabinCount={cabins?.length}
                cabins={cabins}
            />
            {/* <div>{"Today's activity"}</div> */}
            <Today />
            <DurationChart
                confirmedStays={confirmedStays}
                loadingStates={
                    loadingRecentBookings ||
                    loadingRecentStays ||
                    loadingAllCabins
                }
            />
            <SalesChart
                bookings={bookings}
                numDays={numDays}
                loadingStates={
                    loadingRecentBookings ||
                    loadingRecentStays ||
                    loadingAllCabins
                }
            />
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
