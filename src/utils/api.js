export const API = import.meta.env.VITE_API_URL;

export async function apiPost(path, body) {
  try {
    const res = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }
    return data;
  } catch (err) {
    // rethrow the original error so callers can inspect it
    throw err;
  }
}

export async function apiGet(path) {
  try {
    const res = await fetch(`${API}${path}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || `${res.status} ${res.statusText}`;
      throw new Error(msg);
    }
    return data;
  } catch (err) {
    throw err;
  }
}