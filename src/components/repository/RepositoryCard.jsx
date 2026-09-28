import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  selectIsFavorite
} from "../../redux/favoritesSlice";

function RepositoryCard({ repository }) {
  // Receive one repository from RepositoryList and use it in this card.
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, repository.id)
  );

  // Function in RepositoryCard dispatches favorite actions to Redux.
  const handleFavorite = () => {
    dispatch(
      isFavorite
        ? removeFavorite(repository.id)
        : addFavorite(repository)
    );
  };

  return (
    <article className="repository-card">
      <h3>{repository.name}</h3>

      <p>
        {repository.description || "No description available."}
      </p>

      <div className="repository-info">
        <span>
          Language: {repository.language || "N/A"}
        </span>

        <span>
          Stars: {repository.stargazers_count}
        </span>

        <span>
          Forks: {repository.forks_count}
        </span>

        <span>
          Updated: {new Date(repository.updated_at).toLocaleDateString()}
        </span>
      </div>

      <div className="repository-actions">
        <a
          href={repository.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View Repository
        </a>

        {/* Call the card's favorite function when the button is clicked. */}
        <button type="button" onClick={handleFavorite}>
          {isFavorite ? "Remove Favorite" : "Favorite"}
        </button>
      </div>
    </article>
  );
}

export default RepositoryCard;