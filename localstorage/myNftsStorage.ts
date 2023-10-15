export function addMyNftsTourToLocalStorage(my_nfts_tour: string) {
  localStorage.setItem("my_nfts_tour", my_nfts_tour);
}

export function getMyNftsTourFromLocalStorage() {
  return localStorage.getItem("my_nfts_tour");
}

export function deleteMyNftsTourFromLocalStorage() {
  localStorage.removeItem("my_nfts_tour");
}
