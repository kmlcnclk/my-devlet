export function addProfileTourToLocalStorage(profile_tour: string) {
  localStorage.setItem("profile_tour", profile_tour);
}

export function getProfileTourFromLocalStorage() {
  return localStorage.getItem("profile_tour");
}

export function deleteProfileTourFromLocalStorage() {
  localStorage.removeItem("profile_tour");
}
