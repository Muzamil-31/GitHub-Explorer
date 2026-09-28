import { useState } from "react";

function SearchBar({ onSearch }) {
  // Receive the search function created by Home through props.
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = username.trim();

    if (!value) {
      return;
    }

    // Call Home's search function with the entered username.
    onSearch(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;