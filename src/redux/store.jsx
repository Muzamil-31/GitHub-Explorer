import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice.jsx";
import { saveFavorites } from "./favoritesStorage.jsx";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});

// Save Redux favorites to localStorage whenever the store changes.
store.subscribe(() => {
  saveFavorites(store.getState().favorites.repositories);
});