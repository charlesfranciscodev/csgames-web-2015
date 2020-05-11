export function authHeader() {
  let header = {};

  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    header.Authorization = `Bearer ${user.token}`;
  }

  return header;
}
