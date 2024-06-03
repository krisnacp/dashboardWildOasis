import PropTypes from "prop-types";

import Modal from "../../ui/Modal";
// import Button from "../../ui/Button";
// import { BiTrash } from "react-icons/bi";
import ConfirmDelete from "../../ui/ConfirmDelete";

DeleteCabinModal.propTypes = {
    id: PropTypes.number,
    deleteFunc: PropTypes.func,
    deletionState: PropTypes.bool,
    desc: PropTypes.string,
};
function DeleteCabinModal({ id, deleteFunc, deletionState, desc }) {
    return (
        <Modal>
            <Modal.Open opens="delete-cabin">
                {/* <BiTrash /> */}
                <span>{desc}</span>
            </Modal.Open>
            <Modal.Window name="delete-cabin">
                <ConfirmDelete
                    resourceName={`cabin on id ${id}`}
                    onConfirm={deleteFunc}
                    disabled={deletionState}
                />
            </Modal.Window>
        </Modal>
    );
}

export default DeleteCabinModal;
