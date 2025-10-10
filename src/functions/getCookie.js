function getCookie(cookieName) {
  const name = cookieName + "=";
  const cookies = document.cookie.split(';');
  
  for(let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
}

export default getCookie;