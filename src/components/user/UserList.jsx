import UserCard from "./UserCard";

function UserList({ users }) {
  // Receive the users array from Home through props.
  if (users.length === 0) {
    return <p className="empty-message">No users found.</p>;
  }

  return (
    <section className="user-list">
      {users.map((user) => (
        // Pass each user from UserList to UserCard.
        <UserCard
          key={user.id}
          user={user}
        />
      ))}
    </section>
  );
}

export default UserList;