import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  onSnapshot,
  collection,
  onSnapshot as onSnapshotCollection,
} from "firebase/firestore";
import "../styles/PlayerScreen.css";
import PlayerAchievements from "./PlayerAchievements";
import PlayerPowerUps from "./PlayerPowerUps";

import Logo from "../assets/main_title.png";

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

// Import place images
import FirstPlace from "../assets/places/place-1.png";
import SecondPlace from "../assets/places/place-2.png";
import ThirdPlace from "../assets/places/place-3.png";
import FourthPlace from "../assets/places/place-4.png";
import FifthPlace from "../assets/places/place-5.png";
import SixthPlace from "../assets/places/place-6.png";
import SeventhPlace from "../assets/places/place-7.png";
import EighthPlace from "../assets/places/place-8.png";

// Map player IDs to avatar images
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

export function PlayerScreen({ playerId }) {
  const [activeTab, setActiveTab] = useState("home");
  const [playerData, setPlayerData] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);

  // Listen to current player
  useEffect(() => {
    if (!playerId) return;
    const unsub = onSnapshot(doc(db, "players", playerId), (snap) => {
      if (snap.exists()) setPlayerData(snap.data());
    });
    return () => unsub();
  }, [playerId]);

  // Listen to all players for ranking
  useEffect(() => {
    const unsub = onSnapshotCollection(collection(db, "players"), (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllPlayers(data);
    });
    return () => unsub();
  }, []);

  // Calculate rank based on scores
  const getPlace = () => {
    if (!playerData || allPlayers.length === 0) return null;

    const sorted = [...allPlayers].sort((a, b) => b.score - a.score);
    const rank = sorted.findIndex((p) => p.id === playerId) + 1;

    return rank;
  };

  const getPlaceImage = (place) => {
    switch (place) {
      case 1:
        return FirstPlace;
      case 2:
        return SecondPlace;
      case 3:
        return ThirdPlace;
      case 4:
        return FourthPlace;
      case 5:
        return FifthPlace;
      case 6:
        return SixthPlace;
      case 7:
        return SeventhPlace;
      case 8:
        return EighthPlace;
    }
  };

  return (
    <div className="player-screen">
      <img className="player-logo" src={Logo} alt="logo" />
      <nav className="tab-nav">
        {["home", "achievements", "powerups"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </nav>

      {activeTab === "home" && playerData && (
        <div className="player-home">
          <img
            src={avatarMap[playerId] || AdminPic}
            alt="Player Avatar"
            className="player-avatar"
          />
          <h2 className="player-name">{playerData.name}</h2>

          <img
            src={getPlaceImage(getPlace())}
            alt={`Place ${getPlace()}`}
            className="place-image"
          />

          <div className="player-score">
            <h3>{playerData.score ?? 0}</h3>
            <span>Pts</span>
          </div>
        </div>
      )}

      {activeTab === "achievements" && (
        <PlayerAchievements playerId={playerId} />
      )}
      {activeTab === "powerups" && <PlayerPowerUps playerId={playerId} />}
    </div>
  );
}
