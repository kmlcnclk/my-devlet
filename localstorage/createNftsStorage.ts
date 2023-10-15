export function addCreateNftsTourToLocalStorage(create_nfts_tour: string) {
  localStorage.setItem("create_nfts_tour", create_nfts_tour);
}

export function getCreateNftsTourFromLocalStorage() {
  return localStorage.getItem("create_nfts_tour");
}

export function deleteCreateNftsTourFromLocalStorage() {
  localStorage.removeItem("create_nfts_tour");
}
