import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RepositoryList from "../components/repository/RepositoryList";
import UserProfile from "../components/user/UserProfile";
import {
  getUser,
  getUserRepositories
} from "../services/githubApi.jsx";

export default function Profile() {
  const { username } = useParams();
  // Profile owns the fetched user, repository, loading, and error state.
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      setLoading(true);
      setError("");

      try {
        // Profile gets user and repository data from the GitHub API service.
        const [userData, repositoryData] = await Promise.all([
          getUser(username),
          getUserRepositories(username)
        ]);

        if (active) {
          setUser(userData);
          setRepositories(repositoryData);
        }
      } catch {
        if (active) {
          setError("Unable to fetch this GitHub profile.");
          setUser(null);
          setRepositories([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, [username]);

  if (loading) {
    return <p className="status-message">Loading profile...</p>;
  }

  if (error) {
    return (
      <section>
        <p className="error-message">{error}</p>
        <Link className="back-link" to="/">
          Back to search
        </Link>
      </section>
    );
  }

  return (
    <section className="profile-page">
      <Link className="back-link" to="/">
        Back to search
      </Link>

      {/* Pass the loaded user from Profile to UserProfile. */}
      <UserProfile user={user} />

      <div className="repository-section">
        <h2>Repositories</h2>
        {/* Pass the loaded repositories from Profile to RepositoryList. */}
        <RepositoryList repositories={repositories} />
      </div>
    </section>
  );
}