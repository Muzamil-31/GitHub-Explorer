function UserProfile({ user }) {
  // Receive the loaded user from the Profile page through props.
  return (
    <section className="profile-card">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="profile-avatar"
      />

      <h1>{user.name || user.login}</h1>

      <p>@{user.login}</p>

      {user.bio && <p>{user.bio}</p>}

      <div className="profile-info">
        <span>Followers: {user.followers}</span>
        <span>Following: {user.following}</span>
        <span>Repositories: {user.public_repos}</span>
      </div>

      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        GitHub Profile
      </a>
    </section>
  );
}

export default UserProfile;