import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { loadingAllCabins, cabins } = useCabins();
    // console.log(cabins);
    const [searchParams] = useSearchParams();
    const filterParams = searchParams.get("discount");
    const sortByParams = searchParams.get("sortBy");

    const discCabins = cabins?.filter((cabin) => cabin.discount !== 0);
    const noDiscCabins = cabins?.filter((cabin) => cabin.discount === 0);
    // filter discount function
    const afterFiltered = () => {
        if (filterParams === "all") {
            return cabins;
        } else if (filterParams === "discount") {
            return discCabins;
        } else if (filterParams === "no-discount") {
            return noDiscCabins;
        } else {
            return cabins;
        }
    };

    const nameAsc = afterFiltered()
        ?.slice()
        .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    const nameDesc = afterFiltered()
        ?.slice()
        .sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameB < nameA) {
                return -1;
            }
            if (nameB > nameA) {
                return 1;
            }
            return 0;
        });
    const maxCapacityAsc =
        filterParams !== null
            ? afterFiltered()
                  ?.slice()
                  .sort((a, b) => a.maxCapacity - b.maxCapacity)
            : cabins?.slice().sort((a, b) => a.maxCapacity - b.maxCapacity);
    const maxCapacityDesc =
        filterParams !== null
            ? afterFiltered()
                  ?.slice()
                  .sort((a, b) => b.maxCapacity - a.maxCapacity)
            : cabins?.slice().sort((a, b) => b.maxCapacity - a.maxCapacity);
    const regularPriceAsc =
        filterParams !== null
            ? afterFiltered()
                  ?.slice()
                  .sort((a, b) => a.regularPrice - b.regularPrice)
            : cabins?.slice().sort((a, b) => a.regularPrice - b.regularPrice);
    const regularPriceDesc =
        filterParams !== null
            ? afterFiltered()
                  ?.slice()
                  .sort((a, b) => b.regularPrice - a.regularPrice)
            : cabins?.slice().sort((a, b) => b.regularPrice - a.regularPrice);

    // variable sementara untuk menampung nilai yang sesuai dengan sortBy filter
    let sortByVar;
    if (sortByParams === "name-asc") {
        sortByVar = nameAsc;
    }
    if (sortByParams === "name-desc") {
        sortByVar = nameDesc;
    }
    if (sortByParams === "regularPrice-asc") {
        sortByVar = regularPriceAsc;
    }
    if (sortByParams === "regularPrice-desc") {
        sortByVar = regularPriceDesc;
    }
    if (sortByParams === "maxCapacity-asc") {
        sortByVar = maxCapacityAsc;
    }
    if (sortByParams === "maxCapacity-desc") {
        sortByVar = maxCapacityDesc;
    }

    let finalVariable;
    if (!sortByParams && !filterParams) {
        finalVariable = cabins;
    }
    if (filterParams) {
        finalVariable = afterFiltered();
    }
    if (sortByParams) {
        finalVariable = sortByVar;
    }

    if (loadingAllCabins) return <Spinner />;
    if (!cabins.length) return <Empty resource="cabins" />;

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div>Image</div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    {/* <div></div> */}
                </Table.Header>
                <Table.Body
                    data={finalVariable}
                    // data={sortByParams !== null ? afterSort() : afterFiltered()}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
