export function authHeader() {
  const token = localStorage.getItem("token");

  if (token) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
}

export function authHeaders() {
  return { headers: authHeader() };
}
