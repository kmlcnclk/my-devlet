export function addAccessTokenToLocalStorage(access_token: string) {
  localStorage.setItem("access_token", access_token);
}

export function getAccessTokenFromLocalStorage() {
  return localStorage.getItem("access_token");
}

export function deleteAccessTokenFromLocalStorage() {
  localStorage.removeItem("access_token");
}
