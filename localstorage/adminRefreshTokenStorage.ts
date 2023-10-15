export function addAdminRefreshTokenToLocalStorage(
  admin_refresh_token: string
) {
  localStorage.setItem('admin_refresh_token', admin_refresh_token);
}

export function getAdminRefreshTokenFromLocalStorage() {
  return localStorage.getItem('admin_refresh_token');
}

export function deleteAdminRefreshTokenFromLocalStorage() {
  localStorage.removeItem('admin_refresh_token');
}
