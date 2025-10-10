import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // make sure this points to your firebase config

export default function GameLog() {
  const [logs, setLogs] = useState([]);

  // --- Subscribe to log updates ---
  useEffect(() => {
    const q = query(
      collection(db, "gameLog"),
      orderBy("createdAt", "desc"),
      limit(50) // show latest 50
    );

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setLogs(list);
      },
      (err) => console.error("Log subscription error:", err)
    );

    return () => unsubscribe();
  }, []);

  // --- Add a new log entry ---
  async function addLogEntry(
    message,
    gameName = "Unknown Game",
    winner = null
  ) {
    try {
      await addDoc(collection(db, "gameLog"), {
        message,
        game: gameName,
        winner,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Log entry added");
    } catch (err) {
      console.error("❌ Failed to add log entry:", err);
    }
  }

  // --- Reset log ---
  async function resetLog() {
    const snap = await getDocs(collection(db, "gameLog"));
    if (snap.empty) return;

    const batch = writeBatch(db);
    snap.docs.forEach((docRef) => batch.delete(docRef.ref));
    await batch.commit();

    console.log("✅ Game log cleared");

    // optional: add a "reset" entry
    await addDoc(collection(db, "gameLog"), {
      message: "🧹 Game log reset by admin",
      createdAt: serverTimestamp(),
    });
  }

  return (
    <div style={{ padding: "1rem", background: "#222", color: "white" }}>
      <h2>📜 Game Log</h2>

      {/* Buttons for testing/admin use */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() =>
            addLogEntry("🏆 Player A won cornhole!", "cornhole", "Player A")
          }
          style={{ marginRight: "1rem" }}
        >
          ➕ Add Fake Log
        </button>
        <button
          onClick={resetLog}
          style={{ background: "red", color: "white" }}
        >
          🗑 Reset Log
        </button>
      </div>

      {/* Log entries */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {logs.map((entry) => (
          <li key={entry.id} style={{ marginBottom: "0.5rem" }}>
            {entry.message}{" "}
            <span style={{ color: "gray", fontSize: "0.8rem" }}>
              ({entry.game || "?"})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
