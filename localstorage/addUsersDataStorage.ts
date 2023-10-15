export function addAddUsersDataTourToLocalStorage(add_users_data_tour: string) {
  localStorage.setItem("add_users_data_tour", add_users_data_tour);
}

export function getAddUsersDataTourFromLocalStorage() {
  return localStorage.getItem("add_users_data_tour");
}

export function deleteAddUsersDataTourFromLocalStorage() {
  localStorage.removeItem("add_users_data_tour");
}
