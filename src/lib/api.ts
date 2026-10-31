export const SERVER_URL = (process.env.NEXT_PUBLIC_SERVER_URL ?? '').replace(/\/+$/, '');

// Throws with the server's `message` (403, 409, …) so callers can show it in a toast
export const requestServer = async (path: string, init?: RequestInit) => {
    const res = await fetch(`${SERVER_URL}${path}`, init);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message ?? `Request failed (${res.status})`);
    return data;
};

export const sendJson = (path: string, method: 'POST' | 'PATCH', body: unknown) =>
    requestServer(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
