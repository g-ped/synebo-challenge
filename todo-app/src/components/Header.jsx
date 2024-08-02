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
        <div
          className={`icon-${theme}`}
          alt={`${theme}-theme theme-button`}
        ></div>
      </button>
    </header>
  );
}

export default Header;
