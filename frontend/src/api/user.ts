import { apiFetch } from "./client";

export type CurrentUser = {
  id: string;
  email: string;
  createdAt: string;
};

export async function getCurrentUser() {
  const res = await apiFetch("/users/me");
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to load user");
  }
  return data as CurrentUser;
}

export async function updateCurrentUser(email: string) {
  const res = await apiFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to update user");
  }
  return data as CurrentUser;
}

export async function deleteCurrentUser() {
  const res = await apiFetch("/users/me", {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to delete user");
  }
  return data as { status: string };
}
