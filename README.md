# GitHub Explorer

A React application for searching GitHub users, viewing profiles and repositories, and maintaining a persistent list of favorite repositories.

## Features

- Search GitHub users through the GitHub REST API
- View a user's profile and repositories
- Add and remove repositories from Favorites
- Access Favorites from any route
- Persist Favorites across page refreshes with Local Storage
- Switch between dark and light themes
- Display loading, empty, and error states

## Requirements

- Node.js 18 or newer
- npm

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Architecture

The application is organized by responsibility:

```text
src/
  components/       Reusable UI components
  context/          Application-wide theme context
  pages/            Route-level screens
  redux/            Favorites state, selectors, store, and persistence
  services/         GitHub API access
  App.jsx           Routes and shared navigation
  main.jsx          Application providers and bootstrap
```

### Component structure

- `Home` owns user search and search request state.
- `Profile` owns profile and repository loading for the selected user.
- `RepositoryCard` owns repository presentation and the favorite action.
- `RepositoryList` renders repository cards and the empty-list state.
- `Favorites` reads shared repositories and reuses `RepositoryList`.

API loading stays close to the page that needs it, while repository presentation and favorite interactions remain reusable.

### State ownership

- Local UI state belongs to the page or component that owns the interaction.
- Theme state is shared through `ThemeContext`.
- Favorite repositories are global Redux state because they are read and changed from multiple routes.
- API request state is local to `Home` and `Profile` because it does not need to be global.

### API and error handling

GitHub requests are centralized in `src/services/githubApi.js`. The shared request helper throws for non-successful responses, allowing each page to show a user-facing error message and reset failed data safely.

Favorites loaded from Local Storage are validated before entering Redux. Invalid JSON or malformed stored values are ignored and reported through `console.error` instead of crashing the application.

## Hooks and state tools

### `useState`

Used in `Home` and `Profile` for screen-local state such as search results, profile data, repository data, loading status, and error messages.

### `useEffect`

Used in `Profile` to load profile data and repositories when the route username changes. The effect guards against an outdated request updating inactive UI.

### Context

`ThemeContext` stores the light/dark theme and exposes `toggleTheme`. Theme is application-wide presentation state, so Context avoids prop drilling. The selected theme is also persisted in Local Storage.

### `useReducer`

No standalone React `useReducer` is used. Favorites need cross-route access and persistence, so Redux Toolkit is the appropriate state owner. Its `createSlice` API provides the reducer logic without introducing a second competing state-management pattern.

### Redux

Redux Toolkit manages the global `favorites.repositories` collection:

- `addFavorite` adds a repository only once.
- `removeFavorite` removes a repository by ID.
- Selectors provide reusable access to the collection and favorite status.

The store is provided at the application root so repository cards and the Favorites page share the same state.

### Local Storage

`src/redux/favoritesStorage.js` isolates persistence:

- `loadFavorites` hydrates the initial Redux state after validating stored data.
- The Redux store subscription saves the current favorite collection after state changes.

The storage key is `favoriteRepositories`, which preserves favorites across refreshes without requiring a backend account.

## Validation

```bash
npm run lint
npm run build
```
