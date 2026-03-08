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
// Import achievement images
import people_pleaser from "../assets/achievements/people_pleaser.png";
import gg_ez_clapz from "../assets/achievements/gg_ez_clapz.png";
import homie_stock from "../assets/achievements/homie_stock.png";
import dishwasher from "../assets/achievements/dishwasher.png"; 
import rage_baited from "../assets/achievements/rage_baited.png";
import get_spiked from "../assets/achievements/get_spiked.png";
import crickets from "../assets/achievements/crickets.png";
import too_soon_bro from "../assets/achievements/too_soon_bro.png";
import wordplay_wizard from "../assets/achievements/wordplay_wizard.png";
import redemption_arc from "../assets/achievements/redemption_arc.png";
import quiplash from "../assets/achievements/quiplash.png";
import jinx from "../assets/achievements/jinx.png";
import booing from "../assets/achievements/booing.png";
import fake_santa from "../assets/achievements/fake_santa.png";
import double_drip from "../assets/achievements/double_drip.png";
import running_joke from "../assets/achievements/running_joke.png";
import shakespeare from "../assets/achievements/shakespeare.png";
import picasso from "../assets/achievements/picasso.png";
import clingy_ex from "../assets/achievements/clingy_ex.png";
import toxic_ex from "../assets/achievements/toxic_ex.png";
import peaceful from "../assets/achievements/peaceful.png";
import gandalf from "../assets/achievements/gandalf.png";
import gorilla_mode from "../assets/achievements/gorilla_mode.png";
import same_skin from "../assets/achievements/same_skin.png";
import gorilla_warfare from "../assets/achievements/gorilla_warfare.png";
import chicken_dinner from "../assets/achievements/chicken_dinner.png";
import prophecy from "../assets/achievements/prophecy.png";
import island from "../assets/achievements/island.png";
import bounce from "../assets/achievements/bounce.png";
import rerack from "../assets/achievements/rerack.png";
import resurrection from "../assets/achievements/resurrection.png";
import quatro_leches from "../assets/achievements/quatro_leches.png";
import backpack from "../assets/achievements/backpack.png";
import carry from "../assets/achievements/carry.png";
import stalemate from "../assets/achievements/stalemate.png";
import trickshot from "../assets/achievements/trickshot.png";
import swish from "../assets/achievements/swish.png";
import comeback from "../assets/achievements/comeback.png";
import Title from "../assets/achievements/title.png";


const imageMap = {
  people_pleaser,
  gg_ez_clapz,
  homie_stock,
  dishwasher,
  rage_baited,
  get_spiked,
  crickets,
  too_soon_bro,
  wordplay_wizard,
  redemption_arc,
  quiplash,
  jinx,
  booing,
  fake_santa,
  double_drip,
  running_joke,
  shakespeare,
  picasso,
  clingy_ex,
  toxic_ex,
  peaceful,
  gandalf,
  gorilla_mode,
  same_skin,
  gorilla_warfare,
  chicken_dinner,
  prophecy,
  island,
  bounce,
  rerack,
  resurrection,
  quatro_leches,
  backpack,
  carry,
  stalemate,
  trickshot,
  swish,
  comeback,
  Title
};

 
export default function PlayerAchievements({ playerId }) {
  const [achievements, setAchievements] = useState([]);
  const [earned, setEarned] = useState([]);
  const [currentGame, setCurrentGame] = useState("");
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [activeTab, setActiveTab] = useState("available");
  const [allAchievements, setAllAchievements] = useState([]);

  useEffect(() => {
    const fetchAchievements = async () => {
      const snap = await getDocs(collection(db, "achievements"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAllAchievements(list);
    };
    fetchAchievements();
  }, []);

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
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available
        </button>
        <button
          className={`tab-button ${activeTab === "earned" ? "active" : ""}`}
          onClick={() => setActiveTab("earned")}
        >
          Earned
        </button>
      </div>

      {/* === AVAILABLE TAB === */}
      {activeTab === "available" && (
        <>
          {/* CURRENT GAME ACHIEVEMENTS */}
          <h2>{currentGame || "..."}</h2>
          <div className="achievements-grid">
            {gameAchievements.length > 0 ? (
              gameAchievements
                .filter((a) => !earned.includes(a.id))
                .map((a) => {
                  const isSelected = selectedAchievement === a.id;
                  return (
                    <div
                      key={a.id}
                      className="achievement-card"
                      onClick={() =>
                        setSelectedAchievement(isSelected ? null : a.id)
                      }
                    >
                      <img
                        src={imageMap[a.image.replace(".png","")] || a.image}
                        alt={a.title}
                        className="achievement-img"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                      {isSelected && (
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
                    </div>
                  );
                })
            ) : (
              <p>No achievements available for this game.</p>
            )}
          </div>

          {/* OTHER CATEGORY ACHIEVEMENTS */}
          {categoryAchievements.map((cat) => {
            const unearned = cat.items.filter((a) => !earned.includes(a.id));
            return unearned.length > 0 ? (
              <div key={cat.name} className="achievement-category-section">
                <h3>{cat.name}</h3>
                <div className="achievements-grid">
                  {unearned.map((a) => {
                    const isSelected = selectedAchievement === a.id;
                    return (
                      <div
                        key={a.id}
                        className="achievement-card"
                        onClick={() =>
                          setSelectedAchievement(isSelected ? null : a.id)
                        }
                      >
                        <img
                          src={imageMap[a.image.replace(".png","")] || a.image}
                          alt={a.title}
                          className="achievement-img"
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                        {isSelected && (
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
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null;
          })}
        </>
      )}

      {/* === EARNED TAB === */}
      {activeTab === "earned" && (
        <>
          <h2 className="section-title">All Earned Achievements</h2>
          <div className="achievements-grid">
            {Object.entries(
              allAchievements
                .filter((a) => earned.includes(a.id))
                .reduce((acc, achievement) => {
                  const category = achievement.category || "Uncategorized";
                  if (!acc[category]) acc[category] = [];
                  acc[category].push(achievement);
                  return acc;
                }, {})
            ).map(([category, achievements]) => (
              <div key={category} className="achievement-category">
                <h3 className="category-title">{category}</h3>
                <div className="category-achievements">
                  {achievements.map((a) => (
                    <div key={a.id} className="achievement-card earned">
                      <img
                        src={imageMap[a.image.replace(".png","")] || a.image}
                        alt={a.title}
                        className="achievement-img"
                        onError={(e) =>
                          (e.currentTarget.style.display = "none")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {allAchievements.filter((a) => earned.includes(a.id)).length ===
              0 && (
              <p className="no-earned-msg">
                You haven’t earned any achievements yet.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
