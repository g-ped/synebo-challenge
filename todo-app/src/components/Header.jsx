function Header({ theme, setTheme }) {
  return (
    <header className={`${theme}-header todo-header`}>
      <h1 className="header-title">TODO</h1>
      <button
        className="theme-button"
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <img
          src={`/icon-${theme === "dark" ? "moon" : "sun"}.svg`}
          alt={`${theme}-theme theme-button`}
        ></img>
      </button>
    </header>
  );
}

export default Header;
