export function addAdminAccessTokenToLocalStorage(admin_access_token: string) {
  localStorage.setItem('admin_access_token', admin_access_token);
}

export function getAdminAccessTokenFromLocalStorage() {
  return localStorage.getItem('admin_access_token');
}

export function deleteAdminAccessTokenFromLocalStorage() {
  localStorage.removeItem('admin_access_token');
}
