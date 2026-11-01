const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/+$/, '');

type RequestOptions = {
    method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
    body?: unknown;
    token?: string;
};

export const requestServer = async <T>(path: string, { method = 'GET', body, token }: RequestOptions = {}) => {
    const headers: Record<string, string> = {};
    if (body) headers['Content-Type'] = 'application/json';
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${SERVER_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message ?? 'Something went wrong. Please try again.');
    return data as T;
};

export const getClientToken = async () => {
    const res = await fetch('/api/auth/token');
    const { token } = await res.json();
    return token as string;
};

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();
    if (!data.success) throw new Error('Image upload failed. Please try another image.');

    return data.data.display_url as string;
};
