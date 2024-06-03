import PropTypes from "prop-types";

import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
// import Button from "../../ui/Button";
// import { BiEditAlt } from "react-icons/bi";

UpdateCabinModal.propTypes = {
    editedData: PropTypes.object,
    desc: PropTypes.string,
};
function UpdateCabinModal({ editedData, desc }) {
    return (
        <>
            <Modal>
                <Modal.Open opens="edit-form">
                    {/* <BiEditAlt /> */}
                    {/* {children} */}

                    <span>{desc}</span>
                    {/* <>{desc}</> */}
                </Modal.Open>
                <Modal.Window name="edit-form">
                    <CreateCabinForm editedData={editedData} />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default UpdateCabinModal;
