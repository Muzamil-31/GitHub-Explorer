import { Link } from "react-router-dom";

function UserCard({ user }) {
  // Receive one user from UserList through props and use it in this card.
  return (
    <article className="user-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-avatar"
      />

      <h2>{user.login}</h2>

      <div className="card-actions">
        <Link to={`/profile/${user.login}`}>
          View Profile
        </Link>
      </div>
    </article>
  );
}

export default UserCard;