import RepositoryCard from "./RepositoryCard";

function RepositoryList({ repositories }) {
  // Receive repositories from Profile or Favorites through props.
  if (repositories.length === 0) {
    return (
      <p className="empty-message">
        No repositories found.
      </p>
    );
  }

  return (
    <section className="repository-list">
      {repositories.map((repository) => (
        // Pass each repository from RepositoryList to RepositoryCard.
        <RepositoryCard
          key={repository.id}
          repository={repository}
        />
      ))}
    </section>
  );
}

export default RepositoryList;