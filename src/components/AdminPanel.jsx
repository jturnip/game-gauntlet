import React, { useState } from "react";

export function AdminPanel({ addPlayer, players, setPlayers }) {
  const [name, setName] = useState("");
  function create() {
    if (!name) return;
    const id = `p${Date.now()}`;
    const newP = { id, name, score: 0, inventory: [] };
    setPlayers((prev) => [...prev.slice(0, 7), newP]);
    setName("");
  }
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3>Admin Panel</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Player name"
        />
        <button className="btn" onClick={create}>
          Add
        </button>
      </div>
      <div className="small" style={{ marginTop: 8 }}>
        Tip: Use admin to trigger spins, award points, and manage inventories.
      </div>
    </div>
  );
}
