const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// ── Auth ──────────────────────────────────────────────
export const authAPI = {
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login:    (body) => request("/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  me:       ()     => request("/auth/me"),
};

// ── Rooms ─────────────────────────────────────────────
export const roomsAPI = {
  getAll:           (params = {}) => request("/rooms?" + new URLSearchParams(params)),
  getById:          (id)          => request(`/rooms/${id}`),
  checkAvailability:(id, checkIn, checkOut) =>
    request(`/rooms/${id}/availability?checkIn=${checkIn}&checkOut=${checkOut}`),
};

// ── Bookings ──────────────────────────────────────────
export const bookingsAPI = {
  create: (body) => request("/bookings", { method: "POST", body: JSON.stringify(body) }),
  my:     ()     => request("/bookings/my"),
  cancel: (id)   => request(`/bookings/${id}/cancel`, { method: "PATCH" }),
};

// ── Contact ───────────────────────────────────────────
export const contactAPI = {
  submit: (body) => request("/contact", { method: "POST", body: JSON.stringify(body) }),
};
