import PropTypes from "prop-types";
import style from "./SortButton.module.css";

function SortButton ({ label, onSort, currentDirection }) {

  const handleClick = () => {
    const direction = currentDirection === 'asc' ? 'desc' : 'asc';
    onSort(label, direction);
  };

  return (
    <button className={style.Button} onClick={handleClick}>
      sort by {label} {currentDirection === 'asc' ? '↑' : (currentDirection === 'desc' ? '↓' : '')}
    </button>
  );
}

SortButton.propTypes = {
  label: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  currentDirection: PropTypes.string.isRequired
}

export default SortButton;
