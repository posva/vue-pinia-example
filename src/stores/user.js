// @ts-check
import { createStore } from "pinia";

export const useUserStore = createStore("user", () => ({
  name: "Eduardo",
  /** @type {boolean} */
  isAdmin: true
}));

export function logout() {
  const store = useUserStore();

  store.patch({
    name: "",
    isAdmin: false
  });

  // we could do other stuff like redirecting the user
}

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
function apiLogin(a, p) {
  if (a === "ed" && p === "ed") return Promise.resolve({ isAdmin: true });
  if (p === "ed") return Promise.resolve({ isAdmin: false });
  return Promise.reject(new Error("invalid credentials"));
}

/**
 * Attempt to login a user
 * @param {string} user
 * @param {string} password
 */
export async function login(user, password) {
  const store = useUserStore();
  const userData = await apiLogin(user, password);

  store.patch({
    name: user,
    ...userData
  });
}
