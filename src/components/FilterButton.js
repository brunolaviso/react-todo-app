function FilterButton(props) {
  return (
    <>
      <button
        aria-label={`show ${props.name} tasks`}
        className={`filter-buttons__mid-button ${
          props.isPressed ? "filter-buttons__butt-pressed" : ""
        }`}
        onClick={() => props.setFilter(props.name)}
        type="button"
        aria-pressed={props.isPressed}
      >
        <span>{props.name}</span>
      </button>
    </>
  );
}

export default FilterButton;
