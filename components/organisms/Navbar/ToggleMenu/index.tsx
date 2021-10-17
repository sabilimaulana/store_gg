function ToggleMenu() {
  return (
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      // eslint-disable-next-line jsx-a11y/aria-props
      aria-controlsName="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
  );
}

export default ToggleMenu;
