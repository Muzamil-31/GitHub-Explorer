import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import { useTheme } from "./context/ThemeContext";
import NotFound from "./pages/NotFound";


function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header className="navbar">
        <Link to="/" className="logo">
          GitHub Explorer
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
          {/* App calls the context function when the theme button is clicked. */}
          <button type="button" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
         {/* Handles URLs that don't match any route */}
      <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;