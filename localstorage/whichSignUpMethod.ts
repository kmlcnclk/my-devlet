export function addWhichSignUpMethodToLocalStorage(sign_up_method: string) {
  localStorage.setItem("sign_up_method", sign_up_method);
}

export function getWhichSignUpMethodFromLocalStorage() {
  return localStorage.getItem("sign_up_method");
}

export function deleteWhichSignUpMethodFromLocalStorage() {
  localStorage.removeItem("sign_up_method");
}
