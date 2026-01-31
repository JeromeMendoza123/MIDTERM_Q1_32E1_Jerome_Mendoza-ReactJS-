import { useState } from 'react';
export default function Login({ onLoggedin }) {

    const [userName, setUserName] = useState(import.meta.env.VITE_DEFAULT_EMAIL || "");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErr("");
        try {
            await onLoggedin({ userName, password });
        } catch (ex) {
            setErr(ex.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <h1>Auth Demo - Login</h1>
            <form onSubmit={handleSubmit}>
                {/* Controlled Input: Value comes from State, Change updates State */}
                <input
                    type="email"
                    placeholder="Email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                {err && <p style={{ color: 'red' }}>{err}</p>}
            </form>
        </div>
    );
}       