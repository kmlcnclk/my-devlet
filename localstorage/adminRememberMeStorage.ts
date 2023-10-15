export function addAdminRememberMeToLocalStorage(admin_remember_me: string) {
  localStorage.setItem('admin_remember_me', admin_remember_me);
}

export function getAdminRememberMeFromLocalStorage() {
  return localStorage.getItem('admin_remember_me');
}

export function deleteAdminRememberMeFromLocalStorage() {
  localStorage.removeItem('admin_remember_me');
}
