export function addLeftMenuTourForAdminToLocalStorage(
  left_menu_tour_for_admin: string
) {
  localStorage.setItem('left_menu_tour_for_admin', left_menu_tour_for_admin);
}

export function getLeftMenuTourForAdminFromLocalStorage() {
  return localStorage.getItem('left_menu_tour_for_admin');
}

export function deleteLeftMenuTourForAdminFromLocalStorage() {
  localStorage.removeItem('left_menu_tour_for_admin');
}
