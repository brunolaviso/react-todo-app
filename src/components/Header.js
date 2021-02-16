import { useState, useEffect } from "react";

function Header() {
  const [currentTheme, setTheme] = useState("");

  let prefferedTheme = localStorage.getItem("theme");
  const body = document.body;

  useEffect(() => {
    if (prefferedTheme) {
      body.classList.add(prefferedTheme);
      setTheme(prefferedTheme);
    } else {
      body.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  function changeTheme() {
    if (currentTheme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else if (currentTheme === "light") {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  }
  return (
    <header className="header">
      <h1 className="header__heading">TODO</h1>
      <button
        aria-label="change theme"
        onClick={changeTheme}
        className="header__icon"
      ></button>
    </header>
  );
}

export default Header;
