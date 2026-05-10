export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function setStoredUser(user: unknown) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getStoredUser<T>() {
  const raw = localStorage.getItem("user");
  if (!raw) {
    return null as T | null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null as T | null;
  }
}
