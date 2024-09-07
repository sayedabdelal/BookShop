import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function ErrorBlock({ title, message }) {
    return (
        <>
            <div className="error-block">
                <div className="error-block-icon">!</div>
                <div className="error-block-text">
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>

            </div>
            <div className="form-actions">
                <Link to="../" className="button">
                    Okay
                </Link>
            </div>

        </>
    );
}

// Setting default props
ErrorBlock.defaultProps = {
    title: "Error Occurred",
    message: "Something went wrong. Please try again later."
};

// (Optional) Type checking with PropTypes
ErrorBlock.propTypes = {
    title: PropTypes.string,
    message: PropTypes.string,
};


