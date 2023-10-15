export function addRefreshTokenToLocalStorage(refresh_token: string) {
  localStorage.setItem("refresh_token", refresh_token);
}

export function getRefreshTokenFromLocalStorage() {
  return localStorage.getItem("refresh_token");
}

export function deleteRefreshTokenFromLocalStorage() {
  localStorage.removeItem("refresh_token");
}
