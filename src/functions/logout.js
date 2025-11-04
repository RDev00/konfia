export default function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; Secure; SameSite=Strict";
  localStorage.removeItem('userType');
  sessionStorage.clear();
  window.location.href = "/";
}