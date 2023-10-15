export function addRememberMeToLocalStorage(remember_me: string) {
  localStorage.setItem("remember_me", remember_me);
}

export function getRememberMeFromLocalStorage() {
  return localStorage.getItem("remember_me");
}

export function deleteRememberMeFromLocalStorage() {
  localStorage.removeItem("remember_me");
}
