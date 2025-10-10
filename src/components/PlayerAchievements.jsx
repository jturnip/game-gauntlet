import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { onSnapshot } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import "../styles/PlayerAchievements.css";
import Ach1 from "../assets/achievements/Ach1.png";
import Ach2 from "../assets/achievements/Asset 2@300xewdrsfwe.png";
import Ach3 from "../assets/achievements/Asset 3@300xewdrsfwe.png";
import Ach4 from "../assets/achievements/Asset 4@300xewdrsfwe.png";
import Ach5 from "../assets/achievements/Asset 5@300xewdrsfwe.png";
import Ach6 from "../assets/achievements/Asset 6@300xewdrsfwe.png";
import Ach7 from "../assets/achievements/Asset 7@300xewdrsfwe.png";
import Ach8 from "../assets/achievements/Asset 8@300xewdrsfwe.png";
import Ach9 from "../assets/achievements/Asset 9@300xewdrsfwe.png";
import Ach10 from "../assets/achievements/Asset 10@300xewdrsfwe.png";
import Ach11 from "../assets/achievements/Asset 11@300xewdrsfwe.png";
import Ach12 from "../assets/achievements/Asset 12@300xewdrsfwe.png";
import Ach13 from "../assets/achievements/Asset 13@300xewdrsfwe.png";
import Ach14 from "../assets/achievements/Asset 14@300xewdrsfwe.png";
import Ach15 from "../assets/achievements/Asset 15@300xewdrsfwe.png";
import Ach16 from "../assets/achievements/Asset 16@300xewdrsfwe.png";
import Ach17 from "../assets/achievements/Asset 17@300xewdrsfwe.png";
import Ach18 from "../assets/achievements/Asset 18@300xewdrsfwe.png";
import Ach19 from "../assets/achievements/Asset 19@300xewdrsfwe.png";
import Ach20 from "../assets/achievements/Asset 20@300xewdrsfwe.png";
import Ach21 from "../assets/achievements/Asset 21@300xewdrsfwe.png";
import Ach22 from "../assets/achievements/Asset 22@300xewdrsfwe.png";
import Ach23 from "../assets/achievements/Asset 23@300xewdrsfwe.png";
import Ach24 from "../assets/achievements/Asset 24@300xewdrsfwe.png";
import Ach25 from "../assets/achievements/Asset 25@300xewdrsfwe.png";
import Ach26 from "../assets/achievements/Asset 26@300xewdrsfwe.png";
import Ach27 from "../assets/achievements/Asset 27@300xewdrsfwe.png";
import Ach28 from "../assets/achievements/Asset 28@300xewdrsfwe.png";
import Ach29 from "../assets/achievements/Asset 29@300xewdrsfwe.png";
import Ach30 from "../assets/achievements/Asset 30@300xewdrsfwe.png";
import Ach31 from "../assets/achievements/Asset 31@300xewdrsfwe.png";
import Ach32 from "../assets/achievements/Asset 32@300xewdrsfwe.png";
import Ach33 from "../assets/achievements/Asset 33@300xewdrsfwe.png";
import Ach34 from "../assets/achievements/Asset 34@300xewdrsfwe.png";
import Ach35 from "../assets/achievements/Asset 35@300xewdrsfwe.png";
import Ach36 from "../assets/achievements/Asset 36@300xewdrsfwe.png";
import Ach37 from "../assets/achievements/Asset 37@300xewdrsfwe.png";
import Ach38 from "../assets/achievements/Asset 38@300xewdrsfwe.png";
import Ach39 from "../assets/achievements/Asset 39@300xewdrsfwe.png";
import Ach40 from "../assets/achievements/Asset 40@300xewdrsfwe.png";
import Ach41 from "../assets/achievements/Asset 41@300xewdrsfwe.png";
import Ach42 from "../assets/achievements/Asset 42@300xewdrsfwe.png";
import Ach43 from "../assets/achievements/Asset 43@300xewdrsfwe.png";
import Ach44 from "../assets/achievements/Asset 44@300xewdrsfwe.png";
import Ach45 from "../assets/achievements/Asset 45@300xewdrsfwe.png";
import Ach46 from "../assets/achievements/Asset 46@300xewdrsfwe.png";
import Ach47 from "../assets/achievements/Asset 47@300xewdrsfwe.png";
import Ach48 from "../assets/achievements/Asset 48@300xewdrsfwe.png";
import Ach49 from "../assets/achievements/Asset 49@300xewdrsfwe.png";
import Ach50 from "../assets/achievements/Asset 50@300xewdrsfwe.png";
import Ach51 from "../assets/achievements/Asset 51@300xewdrsfwe.png";
import Ach52 from "../assets/achievements/Asset 52@300xewdrsfwe.png";
import Ach53 from "../assets/achievements/Asset 53@300xewdrsfwe.png";
import Ach54 from "../assets/achievements/Asset 54@300xewdrsfwe.png";
import Ach55 from "../assets/achievements/Asset 55@300xewdrsfwe.png";
import Ach56 from "../assets/achievements/Asset 56@300xewdrsfwe.png";
import Ach57 from "../assets/achievements/Asset 57@300xewdrsfwe.png";
import Ach58 from "../assets/achievements/Asset 58@300xewdrsfwe.png";
import Ach59 from "../assets/achievements/Asset 59@300xewdrsfwe.png";
import Ach60 from "../assets/achievements/Asset 60@300xewdrsfwe.png";
import Ach61 from "../assets/achievements/Asset 61@300xewdrsfwe.png";
import Ach62 from "../assets/achievements/Asset 62@300xewdrsfwe.png";
import Ach63 from "../assets/achievements/Asset 63@300xewdrsfwe.png";
import Title from "../assets/achievements/Asset 65@300xewdrsfwe.png";
import Ach66 from "../assets/achievements/Asset 66@300xewdrsfwe.png";

const imageMap = {
  Ach1,
  Ach2,
  Ach3,
  Ach4,
  Ach5,
  Ach6,
  Ach7,
  Ach8,
  Ach9,
  Ach10,
  Ach11,
  Ach12,
  Ach13,
  Ach14,
  Ach15,
  Ach16,
  Ach17,
  Ach18,
  Ach19,
  Ach20,
  Ach21,
  Ach22,
  Ach23,
  Ach24,
  Ach25,
  Ach26,
  Ach27,
  Ach28,
  Ach29,
  Ach30,
  Ach31,
  Ach32,
  Ach33,
  Ach34,
  Ach35,
  Ach36,
  Ach37,
  Ach38,
  Ach39,
  Ach40,
  Ach41,
  Ach42,
  Ach43,
  Ach44,
  Ach45,
  Ach46,
  Ach47,
  Ach48,
  Ach49,
  Ach50,
  Ach51,
  Ach52,
  Ach53,
  Ach54,
  Ach55,
  Ach56,
  Ach57,
  Ach58,
  Ach59,
  Ach60,
  Ach61,
  Ach62,
  Ach63,
  Ach66,
  Title,
};

export default function PlayerAchievements({ playerId }) {
  const [achievements, setAchievements] = useState([]);
  const [earned, setEarned] = useState([]);
  const [currentGame, setCurrentGame] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Load current game
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "adminSettings", "currentGame"),
      (docSnap) => {
        if (docSnap.exists()) {
          setCurrentGame(docSnap.data().game);
        }
      }
    );

    // Cleanup when component unmounts
    return () => unsub();
  }, []);

  // Load all achievements
  useEffect(() => {
    const fetchAchievements = async () => {
      const snap = await getDocs(collection(db, "achievements"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAchievements(list);
    };
    fetchAchievements();
  }, []);

  // Load player data
  useEffect(() => {
    const fetchPlayer = async () => {
      const playerSnap = await getDoc(doc(db, "players", playerId));
      if (playerSnap.exists()) {
        setEarned(playerSnap.data().earnedAchievements || []);
      }
    };
    fetchPlayer();
  }, [playerId]);

  // Filter for current game achievements
  const gameAchievements = achievements.filter(
    (a) => a.category === currentGame || a.category === "any"
  );

  const categories = ["General", "Power Ups", "Achievements", "Special"];

  const categoryAchievements = categories.map((cat) => ({
    name: cat,
    items: achievements.filter((a) => a.category === cat),
  }));

  // Claim achievement
  const claimAchievement = async (achievement) => {
    if (earned.includes(achievement.id)) return alert("Already claimed!");

    try {
      const playerRef = doc(db, "players", playerId);
      const playerSnap = await getDoc(playerRef);

      if (playerSnap.exists()) {
        const playerData = playerSnap.data();
        const newScore = (playerData.score || 0) + achievement.points;
        const updatedAchievements = [
          ...(playerData.earnedAchievements || []),
          achievement.id,
        ];

        await updateDoc(playerRef, {
          score: newScore,
          earnedAchievements: updatedAchievements,
        });

        setEarned(updatedAchievements);
        setSelectedAchievement(null);
      }
    } catch (err) {
      console.error("Error claiming achievement:", err);
    }
  };

  return (
    <div className="achievements-tab">
      <h2>🏆 Achievements for {currentGame || "..."}</h2>

      {/* === CURRENT GAME ACHIEVEMENTS === */}
      <div className="achievements-grid">
        {gameAchievements.length > 0 ? (
          gameAchievements.map((a) => {
            const isEarned = earned.includes(a.id);
            const isSelected = selectedAchievement === a.id;

            return (
              <div
                key={a.id}
                className={`achievement-card ${isEarned ? "earned" : ""}`}
                onClick={() =>
                  isEarned
                    ? null
                    : setSelectedAchievement(isSelected ? null : a.id)
                }
              >
                <img
                  src={imageMap[a.image] || a.image}
                  alt={a.title}
                  className="achievement-img"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />

                {/* Overlay appears when selected */}
                {isSelected && !isEarned && (
                  <div className="achievement-overlay">
                    <button
                      className="claim-btn-overlay"
                      onClick={(e) => {
                        e.stopPropagation();
                        claimAchievement(a);
                      }}
                    >
                      Claim
                    </button>
                  </div>
                )}

                {/* Overlay for claimed achievements */}
                {isEarned && (
                  <div className="achievement-overlay earned">
                    <span>✅ Claimed</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No achievements available for this game.</p>
        )}
      </div>

      {/* === ALWAYS-VISIBLE CATEGORIES === */}
      {categoryAchievements.map((cat) =>
        cat.items.length > 0 ? (
          <div key={cat.name} className="achievement-category-section">
            <h3>{cat.name}</h3>
            <div className="achievements-grid">
              {cat.items.map((a) => {
                const isEarned = earned.includes(a.id);
                const isSelected = selectedAchievement === a.id;

                return (
                  <div
                    key={a.id}
                    className={`achievement-card ${isEarned ? "earned" : ""}`}
                    onClick={() =>
                      isEarned
                        ? null
                        : setSelectedAchievement(isSelected ? null : a.id)
                    }
                  >
                    <img
                      src={imageMap[a.image] || a.image}
                      alt={a.title}
                      className="achievement-img"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />

                    {isSelected && !isEarned && (
                      <div className="achievement-overlay">
                        <button
                          className="claim-btn-overlay"
                          onClick={(e) => {
                            e.stopPropagation();
                            claimAchievement(a);
                          }}
                        >
                          Claim
                        </button>
                      </div>
                    )}

                    {isEarned && (
                      <div className="achievement-overlay earned">
                        <span>✅ Claimed</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
