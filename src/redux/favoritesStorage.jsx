const FAVORITES_STORAGE_KEY = "favoriteRepositories";

function isRepository(value) {
  return (
    value &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    typeof value.html_url === "string"
  );
}

export function loadFavorites() {
  try {
    const savedFavorites = localStorage.getItem(
      FAVORITES_STORAGE_KEY
    );

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites = JSON.parse(savedFavorites);

    return Array.isArray(parsedFavorites)
      ? parsedFavorites.filter(isRepository)
      : [];
  } catch (error) {
    console.error("Unable to load saved favorites.", error);
    return [];
  }
}

export function saveFavorites(repositories) {
  try {
    localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(repositories)
    );
  } catch (error) {
    console.error("Unable to save favorites.", error);
  }
}