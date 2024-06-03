import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabinModal from "../features/cabins/AddCabinModal";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
    return (
        <>
            <Row>
                <Heading as="h1">All cabins</Heading>
                <CabinTableOperations />
            </Row>

            <Row type="vertical">
                <CabinTable />
                <AddCabinModal />
            </Row>
        </>
    );
}

export default Cabins;
