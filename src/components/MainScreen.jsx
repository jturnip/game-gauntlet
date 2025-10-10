import React, { useEffect, useState } from "react";
import GameLog from "./GameLog";
import AchievementsTab from "./Achievements";

import Wheel from "./Wheel";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import "../styles/MainScreen.css";

// Import all game icons
import CornholeIcon from "../assets/games/cornhole.png";
import GeoguesserIcon from "../assets/games/geoguessr.png";
import MarioKartIcon from "../assets/games/mario_kart.png";
import OvercookedIcon from "../assets/games/overcooked.png";
import PongIcon from "../assets/games/pong.png";
import QuiplashIcon from "../assets/games/quiplash.png";
import StickFightIcon from "../assets/games/stickfight.png";
import ZonkIcon from "../assets/games/zonk.png";

// Map game names to icons
const gameIcons = {
  Cornhole: CornholeIcon,
  Geoguesser: GeoguesserIcon,
  MarioKart: MarioKartIcon,
  Overcooked: OvercookedIcon,
  Pong: PongIcon,
  Quiplash: QuiplashIcon,
  StickFight: StickFightIcon,
  Zonk: ZonkIcon,
};

import GameGauntletLogo from "../assets/GGDesktop.png";

// Import powerup icons
import d_glasses from "../assets/powerUps/3d_glasses.png";
import achievement_cat from "../assets/powerUps/achievement_cat.png";
import achievement_guard_dog from "../assets/powerUps/achievement_guard_dog.png";
import the_all_in_game_chip from "../assets/powerUps/all_in_game_chip.png";
import blocky_emerald from "../assets/powerUps/blocky_emerald.png";
import butt_shield from "../assets/powerUps/butt_shield.png";
import buy_one_get_one_coupon from "../assets/powerUps/buy_1_get_1_coupon.png";
import calculated_risk from "../assets/powerUps/calculated_risk.png";
import copy_bubble from "../assets/powerUps/copy_bubble.png";
import fair_trade_token from "../assets/powerUps/fair_trade_token.png";
import foodling_apple from "../assets/powerUps/foodling_apple.png";
import foodling_ice_cream from "../assets/powerUps/foodling_ice_cream.png";
import fun_die from "../assets/powerUps/fun_die.png";
import gauntlet_man_assembled from "../assets/powerUps/gauntlet_man_assembled.png";
import gauntlet_man_head from "../assets/powerUps/gauntlet_man_head.png";
import gauntlet_man_legs from "../assets/powerUps/gauntlet_man_legs.png";
import gauntlet_man_torso from "../assets/powerUps/gauntlet_man_torso.png";
import grabby_glove_deluxe from "../assets/powerUps/grabby_glove_deluxe.png";
import grabby_glove from "../assets/powerUps/grabby_glove.png";
import hot_potato from "../assets/powerUps/hot_potato.png";
import insurance_policy from "../assets/powerUps/insurance_policy.png";
import norbert from "../assets/powerUps/norbert.png";
import not_so_fun_die from "../assets/powerUps/not_so_fun_die.png";
import pickle_jar from "../assets/powerUps/pickle_jar.png";
import point_virus from "../assets/powerUps/point_virus.png";
import power_up_pouch from "../assets/powerUps/power_up_pouch.png";
import time_bomb from "../assets/powerUps/time_bomb.png";
import undo_underwear from "../assets/powerUps/undo_underwear.png";
import the_wheel_of_wheels from "../assets/powerUps/wheel_of_wheels.png";

const powerUpImages = {
  d_glasses,
  achievement_cat,
  achievement_guard_dog,
  the_all_in_game_chip,
  blocky_emerald,
  butt_shield,
  buy_one_get_one_coupon,
  calculated_risk,
  copy_bubble,
  fair_trade_token,
  foodling_apple,
  foodling_ice_cream,
  fun_die,
  gauntlet_man_assembled,
  gauntlet_man_head,
  gauntlet_man_legs,
  gauntlet_man_torso,
  grabby_glove_deluxe,
  grabby_glove,
  hot_potato,
  insurance_policy,
  norbert,
  not_so_fun_die,
  pickle_jar,
  point_virus,
  power_up_pouch,
  time_bomb,
  undo_underwear,
  the_wheel_of_wheels,
};

// Rendering Wheels

const renderWheel = () => {
  switch (selectedWheel) {
    case "blessed":
      return <BlessedWheel onFinish={handleWheelResult} />;
    case "cursed":
      return <CursedWheel onFinish={handleWheelResult} />;
    case "chance":
      return <ChanceWheel onFinish={handleWheelResult} />;
    default:
      return null;
  }
};

// Player avatars
import BenPic from "../assets/avatars/ben.png";
import ChasePic from "../assets/avatars/chase.png";
import CynderPic from "../assets/avatars/cynder.png";
import DrakePic from "../assets/avatars/drake.png";
import JoshiePic from "../assets/avatars/joshie.png";
import JoshuaPic from "../assets/avatars/joshua.png";
import JustinPic from "../assets/avatars/justin.png";
import KurtPic from "../assets/avatars/kurt.png";
import AdminPic from "../assets/avatars/admin.jpg";

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

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white" } },
  { option: "2" },
];

export default () => (
  <>
    <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={3}
      data={data}
      backgroundColors={["#3e3e3e", "#df3428"]}
      textColors={["#ffffff"]}
    />
  </>
);

export function MainScreen() {
  const [players, setPlayers] = useState([]);
  const [lastWheelResult, setLastWheelResult] = useState(null);
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [selectedWheel, setSelectedWheel] = useState("blessed");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [powerUps, setPowerUps] = useState([]);
  const [currentStore, setCurrentStore] = useState([]);
  const [rolling, setRolling] = useState(false);

  // Firestore: Listen to players
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      setPlayers(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, []);

  // Fetch all available power-ups
  useEffect(() => {
    const fetchPowerUps = async () => {
      const snap = await getDocs(collection(db, "powerUps"));
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPowerUps(list);
    };
    fetchPowerUps();
  }, []);

  // Listen for current store updates in real-time
  useEffect(() => {
    const storeRef = doc(db, "adminSettings", "currentStore");
    const unsub = onSnapshot(storeRef, (docSnap) => {
      if (docSnap.exists()) {
        // Always create a new array reference!
        const powerUpsFromFirestore = docSnap.data().powerUps || [];
        setCurrentStore([...powerUpsFromFirestore]); // <-- spread to force state update
      } else {
        setCurrentStore([]);
      }
    });
    return () => unsub();
  }, []);

  // Add new state for current game selection
  const [currentGame, setCurrentGame] = useState("");
  const [currentGameIcon, setCurrentGameIcon] = useState("");

  //points awarded for games
  const gamePoints = {
    Cornhole: { 1: 7, 2: 4 },
    Pong: { 1: 7, 2: 4 },
    Overcooked: { 1: 8, 2: 6, 3: 5, 4: 3 },
    MarioKart: { 1: 10, 2: 6, 3: 4, 4: 2 },
    StickFight: { 1: 10, 2: 6, 3: 4, 4: 2 },
    Jackbox: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
    Zonk: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
    Geoguesser: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
  };

  const [results, setResults] = useState({}); // stores player placements

  async function submitResults() {
    if (!currentGame) return;

    const pointsTable = gamePoints[currentGame] || {};
    let winner = null;

    for (const playerId of Object.keys(results)) {
      const place = results[playerId];
      const points = pointsTable[place] ?? pointsTable.default ?? 0;

      const player = players.find((p) => p.id === playerId);
      if (!player) continue;

      if (points > 0) {
        const playerDoc = doc(db, "players", playerId);
        await updateDoc(playerDoc, { score: (player.score || 0) + points });
      }

      if (place === 1) {
        winner = player; // record 1st place player
      }
    }

    // roll function

    // Takes an array of all power-ups from Firestore
    // Each power-up has a numeric "rarity" (higher = more common)
    function rollStore(allPowerUps) {
      const chosen = [];
      const rollCount = 3; // Number of power-ups to roll

      for (let i = 0; i < rollCount; i++) {
        const pick = weightedRandomPick(allPowerUps);
        if (!chosen.find((c) => c.id === pick.id)) {
          chosen.push(pick);
        } else {
          // If duplicate, try again
          i--;
        }
      }

      return chosen;
    }

    async function rollAndSaveStore() {
      const snapshot = await getDocs(collection(db, "powerUps"));
      const allPowerUps = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const rolledPowerUps = rollStore(allPowerUps);

      await setDoc(doc(db, "currentStore", "active"), {
        rollId: `roll_${Date.now()}`,
        timestamp: new Date().toISOString(),
        powerUps: rolledPowerUps,
      });

      console.log("✅ Store rolled:", rolledPowerUps);
    }

    // Helper function — picks one power-up based on numeric rarity weights
    function weightedRandomPick(powerUps) {
      // Sum all rarity weights
      const totalWeight = powerUps.reduce((sum, p) => sum + p.rarity, 0);
      // Generate a random number between 0 and totalWeight
      const random = Math.random() * totalWeight;

      let cumulative = 0;
      for (const powerUp of powerUps) {
        cumulative += powerUp.rarity;
        if (random <= cumulative) {
          return powerUp;
        }
      }
      // fallback (should never happen)
      return powerUps[powerUps.length - 1];
    }

    // game log

    // Example: record winner
    async function addLogEntry(winnerName, gameName, adminId = null) {
      try {
        await addDoc(collection(db, "gameLog"), {
          message: `🏆 ${winnerName} won ${gameName}!`,
          game: gameName,
          winner: winnerName,
          adminId: adminId, // optional metadata
          createdAt: serverTimestamp(),
        });
        console.log("Log entry added");
      } catch (err) {
        console.error("Failed to add log entry:", err);
      }
    }

    // ✅ Write to game log
    if (winner) {
      const logDoc = doc(collection(db, "gameLog"));
      await setDoc(logDoc, {
        message: `🏆 ${winner.name} won ${currentGame}!`,
        timestamp: Date.now(),
      });
    }

    setResults({});
  }

  const [gameLog, setGameLog] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "gameLog"), (snapshot) => {
      const logs = snapshot.docs.map((doc) => doc.data());
      // sort newest first
      logs.sort((a, b) => b.timestamp - a.timestamp);
      setGameLog(logs);
    });
    return () => unsubscribe();
  }, []);

  // Save current game to Firestore
  async function updateCurrentGame(game) {
    setCurrentGame(game);
    await setDoc(
      doc(db, "adminSettings", "currentGame"),
      { game },
      { merge: true }
    );
  }

  function weightedRandomPick(powerUps) {
    const totalWeight = powerUps.reduce((sum, p) => sum + p.rarity, 0);
    const random = Math.random() * totalWeight;

    let cumulative = 0;
    for (const p of powerUps) {
      cumulative += p.rarity;
      if (random <= cumulative) return p;
    }
    return powerUps[powerUps.length - 1];
  }

  function rollStore() {
    const chosen = [];
    while (chosen.length < 3 && powerUps.length > 0) {
      const pick = weightedRandomPick(powerUps);
      if (!chosen.some((c) => c.id === pick.id)) {
        chosen.push(pick);
      }
    }
    return chosen;
  }

  async function handleRollStore() {
    if (powerUps.length === 0) return;
    setRolling(true);

    try {
      const rolled = [];
      while (rolled.length < 3 && powerUps.length > 0) {
        const pick = weightedRandomPick(powerUps);
        if (!rolled.some((c) => c.id === pick.id)) {
          rolled.push({ ...pick }); // <-- create a NEW object to avoid reference issues
        }
      }

      const storeRef = doc(db, "adminSettings", "currentStore");
      await setDoc(storeRef, {
        powerUps: rolled,
        timestamp: Date.now(),
      });

      console.log("✅ Store rolled and saved:", rolled);
    } catch (err) {
      console.error("Error rolling store:", err);
    } finally {
      setRolling(false);
    }
  }

  useEffect(() => {
    const docRef = doc(db, "adminSettings", "currentGame");
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const gameId = docSnap.data().game;
        setCurrentGame(gameId);

        // Update the icon path based on the selected game
        if (gameId) {
          setCurrentGameIcon(`../assets/games/${gameId}.png`);
        } else {
          setCurrentGameIcon("cornhole");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Sort leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="container main-screen">
      {/* Tabs */}
      <nav className="tab-nav">
        {["admin", "leaderboard", "wheel", "store", "achievements"].map(
          (tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        )}
      </nav>

      {/* Tab content */}
      <div className="tab-content">
        {/* Admin Tab */}
        {activeTab === "admin" && (
          <div className="card">
            <h2>🛠 Admin Controls</h2>

            {/* Select Current Game */}
            <div>
              <label>Select Current Game:</label>
              <select
                value={currentGame || ""}
                onChange={(e) => updateCurrentGame(e.target.value)}
              >
                <option value="">-- Select Game --</option>
                <option value="Cornhole">Cornhole</option>
                <option value="Pong">Pong</option>
                <option value="StickFight">Stick Fight</option>
                <option value="Geoguesser">Geoguesser</option>
                <option value="Overcooked">Overcooked 2</option>
                <option value="Quiplash">Quiplash</option>
                <option value="Zonk">Zonk</option>
                <option value="MarioKart">Mario Kart</option>
              </select>
            </div>

            {/* Game Results Section */}
            {currentGame && (
              <div style={{ marginTop: "1.5rem" }}>
                <h3>Game Results: {currentGame}</h3>
                {players.map((p) => (
                  <div key={p.id} style={{ marginBottom: "0.5rem" }}>
                    <span style={{ marginRight: "1rem" }}>{p.name}</span>
                    <select
                      value={results[p.id] || ""}
                      onChange={(e) =>
                        setResults({
                          ...results,
                          [p.id]: Number(e.target.value),
                        })
                      }
                    >
                      <option value="">-- Place --</option>
                      <option value={1}>1st</option>
                      <option value={2}>2nd</option>
                      <option value={3}>3rd</option>
                      <option value={4}>4th</option>
                      <option value={5}>5th</option>
                      <option value={6}>6th</option>
                      <option value={7}>7th</option>
                      <option value={8}>8th</option>
                    </select>
                  </div>
                ))}

                <button onClick={submitResults}>Submit Results</button>
                <div></div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard */}
        {activeTab === "leaderboard" && (
          <div className="tab-content">
            {/* Left: Leaderboard */}
            <div className="leaderboard-container">
              <h2>Leaderboard</h2>
              <ol className="leaderboard">
                {sortedPlayers.map((p, i) => (
                  <li key={p.id}>
                    {/* Place icon (replace with your own images if you want) */}
                    <img
                      src={
                        new URL(
                          `../assets/places/place-${i + 1}.png`,
                          import.meta.url
                        ).href
                      }
                      alt={`${i + 1} place`}
                      className="place-icon"
                      onError={(e) => (e.currentTarget.style.display = "none")} // hides if no file
                    />

                    {/* Profile avatar */}
                    <img
                      src={avatarMap[p.id] || avatarMap["admin"]}
                      alt={p.name}
                      className="player-avatar"
                    />

                    {/* Player name */}
                    <span className="player-name">{p.name}</span>

                    {/* Player score */}
                    <span className="player-score">{p.score}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: Log + Icon */}
            <div className="game-log">
              <h2>Current Game:</h2>

              <img
                src={gameIcons[currentGame] || null}
                alt="Current Game"
                style={{ width: "200px", height: "200px" }}
              />
              <GameLog />
            </div>
          </div>
        )}

        {/* Wheel */}
        {activeTab === "wheel" && (
          <div className="card">
            <Wheel />
          </div>
        )}

        {/* Store */}
        {activeTab === "store" && (
          <div className="card">
            <h2>🛒 Power-Up Store</h2>

            <button
              onClick={handleRollStore}
              disabled={rolling || powerUps.length === 0}
              className="roll-btn"
            >
              {rolling ? "Rolling..." : "🎲 Roll Store"}
            </button>

            {currentStore.length === 0 ? (
              <p>No power-ups available. Roll the store!</p>
            ) : (
              <div className="store-grid">
                {currentStore.map((p) => (
                  <div key={p.id} className="powerup-card">
                    <img
                      src={powerUpImages[p.id] || p.image || ""}
                      alt={p.name}
                      className="powerup-img"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <h3>{p.title}</h3>
                    <p>{p.price} pts</p>
                    <p>{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Achievements */}
        {activeTab === "achievements" && (
          <div>
            <AchievementsTab />
          </div>
        )}
      </div>
    </div>
  );
}
