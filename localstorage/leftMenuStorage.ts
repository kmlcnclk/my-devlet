export function addLeftMenuTourToLocalStorage(left_menu_tour: string) {
    localStorage.setItem("left_menu_tour", left_menu_tour);
  }
  
  export function getLeftMenuTourFromLocalStorage() {
    return localStorage.getItem("left_menu_tour");
  }
  
  export function deleteLeftMenuTourFromLocalStorage() {
    localStorage.removeItem("left_menu_tour");
  }
  