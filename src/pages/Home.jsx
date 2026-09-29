import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/common/SearchBar";
import UserList from "../components/user/UserList";
import { searchUsers } from "../services/githubApi.jsx";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const username = searchParams.get("q") || "";

  // Search again whenever the username in the URL changes.
  useEffect(() => {
    if (!username) {
      setUsers([]);
      setLoading(false);
      setError("");
      return;
    }

    let active = true;

    async function fetchUsers() {
      setLoading(true);
      setError("");

      try {
        const data = await searchUsers(username);

        if (active) {
          setUsers(data);
        }
      } catch {
        if (active) {
          setError("Unable to fetch GitHub users.");
          setUsers([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchUsers();

    return () => {
      active = false;
    };
  }, [username]);

  // Save the searched username in the URL.
  const handleSearch = (username) => {
    const value = username.trim();

    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <section>
      <div className="page-header">
        <h1>GitHub Explorer</h1>
        <p>Search for GitHub users.</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="status-message">Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {!loading && !error && <UserList users={users} />}
    </section>
  );
}

export default Home;