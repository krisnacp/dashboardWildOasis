import styled from "styled-components";
import PropTypes from "prop-types";
import { BiDuplicate, BiEditAlt, BiTrash } from "react-icons/bi";

import { useDeleteCabin } from "./useDeleteCabin";
import { formatCurrency } from "../../utils/helpers";
import { useAddCabin } from "./useAddCabin";
// import UpdateCabinModal from "./UpdateCabinModal";
// import DeleteCabinModal from "./DeleteCabinModal";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

CabinRow.propTypes = {
    cabin: PropTypes.object,
};

function CabinRow({ cabin }) {
    const {
        id,
        name,
        maxCapacity,
        regularPrice,
        discount,
        // description,
        image,
    } = cabin;

    // hasil refactoring code dari function deleteCabin react-query
    const { loadingDelete, mutateDelete } = useDeleteCabin();
    const { loadingAdd, mutateAdd } = useAddCabin();

    // membuat function untuk duplikat cabin item yang sudah ada
    function handleDuplicate(cabinData) {
        mutateAdd({ ...cabinData, name: `Copy of ${cabinData.name}` });
    }

    return (
        <>
            <TableRow>
                <Img src={image} />
                <Cabin>{name}</Cabin>
                <div>Fits up to {maxCapacity} guests</div>
                <Price>{formatCurrency(regularPrice)}</Price>
                {discount ? (
                    <Discount>{formatCurrency(discount)}</Discount>
                ) : (
                    <span>&mdash;</span>
                )}
                <div>
                    {/* <button
                        onClick={() => handleDuplicate(cabin)}
                        disabled={loadingAdd}
                    >
                        <BiDuplicate />
                    </button> */}
                    {/* <DeleteCabinModal
                        deleteFunc={() => mutateDelete(id)}
                        deletionState={loadingDelete}
                        id={id}
                        desc={"delete"}
                    /> */}
                    {/* <UpdateCabinModal editedData={cabin} desc="Edit" /> */}

                    <Modal>
                        <Menus.Menu>
                            <Menus.Toggle id={id} />
                            <Menus.List id={id}>
                                <Menus.Button
                                    icon={<BiDuplicate />}
                                    onClick={() => handleDuplicate(cabin)}
                                    loading={loadingAdd}
                                >
                                    Duplicate
                                </Menus.Button>

                                {/* edit button | refactoring code, karena function pada file Menu, jika Modal dibuat seara terspisah, program tidak akan berjalan */}
                                <Modal.Open opens="edit-form">
                                    <Menus.Button icon={<BiEditAlt />}>
                                        <span>Edit</span>
                                    </Menus.Button>
                                </Modal.Open>

                                {/* delete button */}
                                <Modal.Open opens="delete-cabin">
                                    <Menus.Button
                                        icon={<BiTrash />}
                                        loading={loadingDelete}
                                    >
                                        <span>Delete</span>
                                    </Menus.Button>
                                </Modal.Open>
                            </Menus.List>

                            {/* edit form */}
                            <Modal.Window name="edit-form">
                                <CreateCabinForm editedData={cabin} />
                            </Modal.Window>
                            {/* delete feature */}
                            <Modal.Window name="delete-cabin">
                                <ConfirmDelete
                                    resourceName={`cabin on id ${id}`}
                                    onConfirm={() => mutateDelete(id)}
                                    disabled={loadingDelete}
                                />
                            </Modal.Window>
                        </Menus.Menu>
                    </Modal>
                </div>
            </TableRow>
        </>
    );
}

export default CabinRow;
