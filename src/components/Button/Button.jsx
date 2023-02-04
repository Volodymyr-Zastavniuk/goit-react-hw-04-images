import './Button.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, isLoading }) => {
  return (
    <button
      type="button"
      className="Button"
      onClick={onClick}
      disabled={isLoading}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
