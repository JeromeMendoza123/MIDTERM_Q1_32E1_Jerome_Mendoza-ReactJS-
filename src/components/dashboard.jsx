import { useState } from 'react';

export default function Dashboard({ auth, onLogout, onFetchRecipes }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const loadRecipes = async () => {
        setErr("");
        setLoading(true);
        try {
            const data = await onFetchRecipes(auth);
            setRecipes(data);
        } catch (ex) {
            setErr(ex.message || "Failed to load recipes.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await onLogout(auth);
    };

    return (
        <div className="dashboard">
            <h1>Recipe Dashboard</h1>
            <button onClick={loadRecipes} disabled={loading}>
                {loading ? "Loading..." : "Load Recipes"}
            </button>
            <button onClick={loadRecipes} disabled={loading}>
                {loading ? "Loading..." : "Load Recipes"}
            </button>
            <button onClick={handleLogout}>Logout</button>

            {err && <p style={{ color: 'red' }}>{err}</p>}

            {/* The List Illustration: Turning Data into UI */}
            <ul>
                {recipes.map((r, i) => (
                    <li key={i}>
                        <strong>{r.title}</strong>
                        {r.ingredients && (
                            <ul>
                                {r.ingredients.map((ing, j) => (
                                    <li key={j}>{ing.quantity} {ing.uom} {ing.item}</li>
                                ))}
                            </ul>
                        )}
                        <p>Instructions: {r.instructions}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}