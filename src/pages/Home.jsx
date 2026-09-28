import { useState } from "react";
import SearchBar from "../components/common/SearchBar";
import UserList from "../components/user/UserList";
import { searchUsers } from "../services/githubApi.jsx";

function Home() {
  // Home owns the search results and request status state.
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function created in Home and passed to SearchBar.
  const handleSearch = async (username) => {
    setLoading(true);
    setError("");

    try {
      // Search data comes from the GitHub API service and is stored in Home.
      const data = await searchUsers(username);
      setUsers(data);
    } catch {
      setError("Unable to fetch GitHub users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="page-header">
        <h1>GitHub Explorer</h1>
        <p>Search for GitHub users.</p>
      </div>

      {/* Pass Home's search function to SearchBar through props. */}
      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {/* Pass users from Home to UserList for rendering. */}
      {!loading && !error && <UserList users={users} />}
    </section>
  );
}

export default Home;