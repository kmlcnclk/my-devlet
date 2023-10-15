export function addCreateRuleTourToLocalStorage(create_rule_tour: string) {
  localStorage.setItem("create_rule_tour", create_rule_tour);
}

export function getCreateRuleTourFromLocalStorage() {
  return localStorage.getItem("create_rule_tour");
}

export function deleteCreateRuleTourFromLocalStorage() {
  localStorage.removeItem("create_rule_tour");
}
