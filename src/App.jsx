import React, { useEffect, useState } from "react";
import { LoginScreen } from "./components/LoginScreen";
import { PlayerScreen } from "./components/PlayerScreen";
import { MainScreen } from "./components/MainScreen";
import { AdminPanel } from "./components/AdminPanel";
import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [players, setPlayers] = useState([]);

  // Listen to players collection from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setPlayers(list);
    });

    return () => unsubscribe();
  }, []);

  // Show login screen until user selects themselves
  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  // Admin sees MainScreen + AdminPanel
  if (currentUser.id === "admin") {
    return (
      <div>
        <MainScreen />
      </div>
    );
  }

  // Regular player sees their PlayerScreen
  return <PlayerScreen playerId={currentUser.id} />;
}
