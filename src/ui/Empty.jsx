import PropTypes from "prop-types";

Empty.propTypes = {
    resource: PropTypes.string,
};

function Empty({ resource }) {
    return <p>No {resource} could be found.</p>;
}

export default Empty;
