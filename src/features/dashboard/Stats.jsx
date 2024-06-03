import PropTypes from "prop-types";
import {
    BiBarChartAlt2,
    BiBriefcase,
    BiCalendar,
    BiMoney,
} from "react-icons/bi";

import Stat from "./Stat";
// import Spinner from "../../ui/Spinner";

Stats.propTypes = {
    bookings: PropTypes.array,
    confirmStays: PropTypes.array,
    numDays: PropTypes.number,
    cabinCount: PropTypes.number,
    loadingStates: PropTypes.bool,
    cabins: PropTypes.array,
};
function Stats({
    bookings,
    confirmStays,
    numDays,
    // cabinCount,
    loadingStates,
    cabins,
}) {
    if (loadingStates) {
        return (
            <>
                <Stat
                    title="Booking"
                    color="blue"
                    icon={<BiBriefcase />}
                    loadingStates={loadingStates}
                />
                <Stat
                    title="Sales"
                    color="green"
                    icon={<BiMoney />}
                    loadingStates={loadingStates}
                />
                <Stat
                    title="Check Ins"
                    color="indigo"
                    icon={<BiCalendar />}
                    loadingStates={loadingStates}
                />
                <Stat
                    title="Occupansy Rate"
                    color="yellow"
                    icon={<BiBarChartAlt2 />}
                    loadingStates={loadingStates}
                />
            </>
        );
    }
    const numBookings = bookings.length;
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
    const chekcins = confirmStays.length;
    // const occupation =
    //     confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    //     (numDays * cabinCount);
    const occupation =
        confirmStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabins.length);
    return (
        <>
            <Stat
                title="Booking"
                color="blue"
                icon={<BiBriefcase />}
                value={numBookings}
            />
            <Stat
                title="Sales"
                color="green"
                icon={<BiMoney />}
                value={sales}
            />
            <Stat
                title="Check Ins"
                color="indigo"
                icon={<BiCalendar />}
                value={chekcins}
            />
            <Stat
                title="Occupansy Rate"
                color="yellow"
                icon={<BiBarChartAlt2 />}
                value={Math.round(occupation * 100) + "%"}
            />
        </>
    );
}

export default Stats;
