import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import "../styles/PlayerScreen.css";
import PlayerAchievements from "./PlayerAchievements";

// Import local images
import BenPic from "../assets/avatars/ben.png";
import ChasePic from "../assets/avatars/chase.png";
import CynderPic from "../assets/avatars/cynder.png";
import DrakePic from "../assets/avatars/drake.png";
import JoshiePic from "../assets/avatars/joshie.png";
import JoshuaPic from "../assets/avatars/joshua.png";
import JustinPic from "../assets/avatars/justin.png";
import KurtPic from "../assets/avatars/kurt.png";
import AdminPic from "../assets/avatars/admin.jpg";

// Map player IDs to images
const avatarMap = {
  ben: BenPic,
  chase: ChasePic,
  cynder: CynderPic,
  drake: DrakePic,
  joshie: JoshiePic,
  joshua: JoshuaPic,
  justin: JustinPic,
  kurt: KurtPic,
  admin: AdminPic,
};

export function PlayerScreen({ playerId }) {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="player-screen">
      <nav className="tab-nav">
        {["home", "achievements"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      {activeTab === "achievements" && (
        <PlayerAchievements playerId={playerId} />
      )}
    </div>
  );
}
