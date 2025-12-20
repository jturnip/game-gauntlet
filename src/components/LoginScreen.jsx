import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "../styles/LoginScreen.css";

import desktopLogo from "../assets/tusmtm_logo.png";
import mobileLogo from "../assets/tusmtm_logo.png";

// Import local images
import BrysonPic from "../assets/avatars/bryson_head.png";
import ConnerPic from "../assets/avatars/conner_head.png";
import ElijahPic from "../assets/avatars/elijah_head.png";
import DrakePic from "../assets/avatars/drake_head.png";
import NatePic from "../assets/avatars/nate_head.png";
import LincolnPic from "../assets/avatars/lincoln_head.png";
import NathanPic from "../assets/avatars/nathan_head.png";
import BennyPic from "../assets/avatars/benny_head.png";
import AdminPic from "../assets/avatars/admin.jpg";

// Map player IDs to images
const avatarMap = {
  bryson: BrysonPic,
  conner: ConnerPic,
  elijah: ElijahPic,
  drake: DrakePic,
  nate: NatePic,
  lincoln: LincolnPic,
  nathan: NathanPic,
  benny: BennyPic,
  admin: AdminPic,
};

export function LoginScreen({ onLogin }) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const list = snapshot.docs.map((doc) => doc.data());
      setPlayers(list);
    });
    return () => unsubscribe();
  }, []);

  function handleLogin(player) {
    onLogin(player);
  }

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        className="card"
        style={{ width: "360px", textAlign: "center", padding: "1rem" }}
      >
        <img
          src={desktopLogo}
          alt="Game Gauntlet"
          className="logo desktop-logo"
        />
        <img
          src={mobileLogo}
          alt="Game Gauntlet"
          className="logo mobile-logo"
        />
        <h3 style={{ marginBottom: "1rem" }}>Select your identity:</h3>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          {players.map((p) => (
            <button
              key={p.id}
              onClick={() => handleLogin(p)}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.5rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: "#f9f9f9",
                textAlign: "left",
              }}
            >
              <img
                src={avatarMap[p.id] || avatarMap["admin"]}
                alt={p.name}
                style={{
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "50%",
                  marginRight: "0.5rem",
                }}
              />
              <span>{p.name}</span>
            </button>
          ))}

          {/* GG Admin */}
          <button
            onClick={() => handleLogin({ id: "admin", name: "GG Admin" })}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              cursor: "pointer",
              background: "#f9f9f9",
              textAlign: "left",
              marginTop: "1rem",
            }}
          >
            <img
              src={avatarMap["admin"]}
              alt="GG Admin"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "0.5rem",
              }}
            />
            <span>GG Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}
