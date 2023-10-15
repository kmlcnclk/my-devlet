export function addWhichSignInMethodToLocalStorage(sign_in_method: string) {
  localStorage.setItem("sign_in_method", sign_in_method);
}

export function getWhichSignInMethodFromLocalStorage() {
  return localStorage.getItem("sign_in_method");
}

export function deleteWhichSignInMethodFromLocalStorage() {
  localStorage.removeItem("sign_in_method");
}
