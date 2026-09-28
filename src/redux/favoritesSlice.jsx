import { createSlice } from "@reduxjs/toolkit";
import { loadFavorites } from "./favoritesStorage.jsx";

const initialState = {
  repositories: loadFavorites()
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    addFavorite: (state, action) => {
      // The repository to add comes from RepositoryCard in action.payload.
      const exists = state.repositories.some(
        (repository) => repository.id === action.payload.id
      );

      if (!exists) {
        state.repositories.push(action.payload);
      }
    },

    removeFavorite: (state, action) => {
      // The repository id to remove comes from RepositoryCard in action.payload.
      state.repositories = state.repositories.filter(
        (repository) => repository.id !== action.payload
      );
    }
  }
});

export const {
  addFavorite,
  removeFavorite
} = favoritesSlice.actions;

export const selectFavoriteRepositories = (state) =>
  state.favorites.repositories;

export const selectIsFavorite = (state, repositoryId) =>
  state.favorites.repositories.some(
    (repository) => repository.id === repositoryId
  );

export default favoritesSlice.reducer;