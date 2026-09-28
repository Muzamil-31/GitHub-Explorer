import { useSelector } from "react-redux";
import RepositoryList from "../components/repository/RepositoryList";
import { selectFavoriteRepositories } from "../redux/favoritesSlice";

function Favorites() {
  // Read favorite repositories from the Redux store provided in main.jsx.
  const repositories = useSelector(selectFavoriteRepositories);

  return (
    <section>
      <div className="page-header">
        <h1>Favorites</h1>
        <p>Your saved GitHub repositories.</p>
      </div>

      {/* Pass Redux favorites from Favorites to RepositoryList. */}
      <RepositoryList repositories={repositories} />
    </section>
  );
}

export default Favorites;