const BASE_URL = "https://api.github.com";

async function request(url) {
  const response = await fetch(`${BASE_URL}${url}`);
// successful HTTP status codes (200-299)
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

// Search GitHub users 
export async function searchUsers(username) {
  const data = await request(
    `/search/users?q=${encodeURIComponent(username)}`
  );

  return data.items;
}

// Get a user's profile
export async function getUser(username) {
  return request(`/users/${username}`);
}

// Get a user's repositories
export async function getUserRepositories(username) {
  return request(`/users/${username}/repos?sort=updated&per_page=30`);
}

// Get a single repository
export async function getRepository(owner, repo) {
  return request(`/repos/${owner}/${repo}`);
}