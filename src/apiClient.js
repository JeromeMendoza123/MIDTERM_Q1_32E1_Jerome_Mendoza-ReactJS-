const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:7858';
const RES_API_BASE = import.meta.env.VITE_RES_API_BASE || 'http://localhost:7860';

export async function login({ userName, password }) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password })
    });
    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    return { token: data.token };
}

export async function fetchRecipes(auth) {
    const res = await fetch(`${RES_API_BASE}/recipes`, {
        method: 'GET',
        headers: { "Authorization": `Bearer ${auth.token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch recipes');

    return res.json();
    }
    export async function logout(auth) {
    const res = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${auth.token}` }
    });
    if (!res.ok) throw new Error('Logout failed');
}