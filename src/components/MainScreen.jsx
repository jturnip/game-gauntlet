import React, { useEffect, useState } from "react";
import GameLog from "./GameLog";
import AchievementsTab from "./Achievements";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  getDocs,
  serverTimestamp,
  increment,
  arrayUnion,
} from "firebase/firestore";
import styles from "../styles/MainScreen.module.css";

// Import all game icons
import SuperSmashBrosIcon from "../assets/games/super_smash_bros.png";
import GangBeastsIcon from "../assets/games/gang_beasts.png";
import MarioKartIcon from "../assets/games/mario_kart.png";
import WiiSportsBasketballIcon from "../assets/games/wii_sports_basketball.png";
import SpoonsIcon from "../assets/games/spoons.png";
import QuiplashIcon from "../assets/games/quiplash.png";


// Map game names to icons
const gameIcons = {
  SuperSmashBros: SuperSmashBrosIcon,
  GangBeasts: GangBeastsIcon,
  MarioKart: MarioKartIcon,
  Basketball: WiiSportsBasketballIcon,
  Spoons: SpoonsIcon,
  Quiplash: QuiplashIcon,
};

import GameGauntletLogo from "../assets/tusmtm_logo.png";
import ShopTitle from "../assets/ItemShop.png";
import LeaderboardTitle from "../assets/Leaderboard.png";

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

// Player avatars
import BrysonPic from "../assets/avatars/bryson_head.png";
import ConnerPic from "../assets/avatars/conner_head.png";
import ElijahPic from "../assets/avatars/elijah_head.png";
import DrakePic from "../assets/avatars/drake_head.png";
import NatePic from "../assets/avatars/nate_head.png";
import LincolnPic from "../assets/avatars/lincoln_head.png";
import NathanPic from "../assets/avatars/nathan_head.png";
import BennyPic from "../assets/avatars/benny_head.png";
import AdminPic from "../assets/avatars/admin.jpg";

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

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white" } },
  { option: "2" },
];

export function MainScreen() {
  const [players, setPlayers] = useState([]);
  const [lastWheelResult, setLastWheelResult] = useState(null);
  const [activeTab, setActiveTab] = useState("leaderboard");
  const [selectedWheel, setSelectedWheel] = useState("blessed");
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [powerUps, setPowerUps] = useState([]);
  const [currentStore, setCurrentStore] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [pointsToGive, setPointsToGive] = useState(0);
  const [availablePowerUps, setAvailablePowerUps] = useState([]); // all power-ups in the store
  const [availableAchievements, setAvailableAchievements] = useState([]);
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);

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
    SuperSmashBros: { 1: 10, 2: 6, 3: 4 },
    GangBeasts: { 1: 10, 2: 6, 3: 4 },
    WiiSportsBasketball: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
    Quiplash: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
    Spoons: { 1: 12, 2: 9, 3: 7, 4: 6, 5: 4, 6: 3, 7: 2, 8: 1 },
    MarioKart: { 1: 10, 2: 6, 3: 4, 4: 2 }
  };

  const [results, setResults] = useState({}); // stores player placements

  // admin panel stuff

  useEffect(() => {
    // Load players
    const unsubPlayers = onSnapshot(collection(db, "players"), (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPlayers(list);
    });

    // Load power-ups
    const storeRef = doc(db, "currentStore", "active");
    const unsubStore = onSnapshot(storeRef, (docSnap) => {
      if (docSnap.exists()) {
        setAvailablePowerUps(docSnap.data().powerUps || []);
      }
    });

    // Load achievements
    const achievementsCol = collection(db, "achievements");
    getDocs(achievementsCol).then((snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setAvailableAchievements(list);
    });

    return () => {
      unsubPlayers();
      unsubStore();
    };
  }, []);

  // Give points
  const givePoints = async (playerId, points) => {
    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, { score: increment(points) });
    console.log(`Gave ${points} points to ${playerId}`);
  };

  // Give specific power-up
  const givePowerUp = async (playerId, powerUp) => {
    if (!playerId || !powerUp) return;

    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    const inventory = player.inventory || [];

    // Check if player already has 4 power-ups
    if (inventory.length >= 4) {
      alert(`${player.name} already has 4 power-ups! Cannot give more.`);
      return;
    }

    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, {
      inventory: arrayUnion({
        id: powerUp.id,
        title: powerUp.title,
        image: powerUp.id,
        rarity: powerUp.rarity,
        price: powerUp.price,
        description: powerUp.description,
      }),
    });

    console.log(`Gave power-up ${powerUp.title} to ${player.name}`);
  };

  // Give random power-up
  // Give random power-up from complete list of all power-ups
  // Give random power-up from complete list of all power-ups
  const giveRandomPowerUp = async (playerId) => {
    const player = players.find((p) => p.id === playerId);
    if (!player) return;

    const inventory = player.inventory || [];

    // Check if inventory is full
    if (inventory.length >= 4) {
      alert(`${player.name} already has 4 power-ups and cannot receive more.`);
      return;
    }

    if (!powerUps.length) return; // full list of power-ups

    const randomIndex = Math.floor(Math.random() * powerUps.length);
    const randomPU = powerUps[randomIndex];

    await givePowerUp(playerId, {
      id: randomPU.id,
      title: randomPU.title,
      image: randomPU.id,
      rarity: randomPU.rarity,
      price: randomPU.price,
      description: randomPU.description,
    });

    console.log(`Gave random power-up ${randomPU.title} to ${playerId}`);
  };

  // Give random achievement
  const giveRandomAchievement = async (playerId) => {
    if (!availableAchievements.length) return;

    // Filter achievements player already has
    const player = players.find((p) => p.id === playerId);
    const earned = player?.earnedAchievements || [];
    const remaining = availableAchievements.filter(
      (a) => !earned.includes(a.id)
    );

    if (!remaining.length) return alert("Player has all achievements!");

    const randomIndex = Math.floor(Math.random() * remaining.length);
    const achievement = remaining[randomIndex];

    const playerRef = doc(db, "players", playerId);
    await updateDoc(playerRef, {
      earnedAchievements: arrayUnion(achievement.id),
      score: increment(achievement.points || 0),
    });

    console.log(`Gave achievement ${achievement.title} to ${playerId}`);
  };

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
    if (!powerUps || powerUps.length === 0) return;
    setRolling(true);

    try {
      // Build the rolled array (create new objects to avoid referencing originals)
      const rolled = [];
      while (rolled.length < 3 && powerUps.length > 0) {
        const pick = weightedRandomPick(powerUps);
        // ensure uniqueness in this roll
        if (!rolled.some((c) => c.id === pick.id)) {
          rolled.push({ ...pick });
        }
      }

      // Immediately update local state so admin UI shows the roll without waiting for Firestore
      setCurrentStore(rolled);

      // Persist to Firestore at the doc your player-side listens to
      // (player is listening to doc(db, "currentStore", "active"))
      const storeRef = doc(db, "currentStore", "active");
      await setDoc(storeRef, {
        rollId: `roll_${Date.now()}`,
        timestamp: serverTimestamp(),
        powerUps: rolled,
      });

      console.log("✅ Store rolled and saved to Firestore:", rolled);
    } catch (err) {
      console.error("Error rolling store:", err);
      // Optionally revert local UI or show an error toast
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
    <div className={`${styles.container} ${styles.mainScreen}`}>
      {/* Tabs */}
      <nav className={styles.tabNav}>
        {["admin", "leaderboard", "store", "achievements"].map((tab) => (
          <button
            key={tab}
            className={
              activeTab === tab ? `${styles.tab} ${styles.active}` : styles.tab
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {/* Admin Tab */}
        {activeTab === "admin" && (
          <div className={styles.card}>
            <h2>🛠 Admin Controls</h2>

            {/* Select Current Game */}
            <div>
              <label>Select Current Game:</label>
              <select
                value={currentGame || ""}
                onChange={(e) => updateCurrentGame(e.target.value)}
              >
                <option value="">-- Select Game --</option>
                <option value="SuperSmashBros">Super Smash Bros</option>
                <option value="GangBeasts">Gang Beasts</option>
                <option value="Basketball">Wii Sports Basketball</option>
                <option value="Quiplash">Quiplash</option>
                <option value="Spoons">Spoons</option>
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
                <select onChange={(e) => setSelectedPlayer(e.target.value)}>
                  <option value="">Select Player</option>
                  {players.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <div className="points-input">
                  <label>Adjust Points:</label>
                  <input
                    type="number"
                    placeholder="Enter points (e.g. +5 or -3)"
                    value={pointsToGive}
                    onChange={(e) => setPointsToGive(Number(e.target.value))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && selectedPlayer) {
                        givePoints(selectedPlayer, pointsToGive);
                        setPointsToGive(0); // reset input
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      if (selectedPlayer) {
                        givePoints(selectedPlayer, pointsToGive);
                        setPointsToGive(0); // reset input
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>

                <div>
                  <button onClick={() => giveRandomPowerUp(selectedPlayer)}>
                    Give Random Power-Up
                  </button>
                  <button onClick={() => giveRandomAchievement(selectedPlayer)}>
                    Give Random Achievement
                  </button>
                </div>

                <div>
                  <h3>Give Specific Power-Up</h3>
                  <select
                    value={selectedPowerUp?.id || ""}
                    onChange={async (e) => {
                      const puId = e.target.value;
                      if (!puId || !selectedPlayer) return;

                      const pu = powerUps.find((p) => p.id === puId);
                      if (!pu) return;

                      // Check if player has 4 power-ups
                      const player = players.find(
                        (p) => p.id === selectedPlayer
                      );
                      const inventory = player?.inventory || [];
                      if (inventory.length >= 4) {
                        alert(
                          `${player.name} already has 4 power-ups and cannot receive more.`
                        );
                        return;
                      }

                      await givePowerUp(selectedPlayer, {
                        id: pu.id,
                        title: pu.title,
                        image: pu.id,
                        rarity: pu.rarity,
                        price: pu.price,
                        description: pu.description,
                      });

                      // Optional: clear selection after giving
                      setSelectedPowerUp(null);
                    }}
                  >
                    <option value="">-- Select Power-Up --</option>
                    {powerUps.map((pu) => (
                      <option key={pu.id} value={pu.id}>
                        {pu.title} ({pu.rarity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard */}
        {/* Leaderboard */}
        {activeTab === "leaderboard" && (
          <div className={styles.leaderboardRightContainer}>
            <img
              className={styles.shopTitle}
              src={LeaderboardTitle}
              alt="shop"
            />
            {/* Left: two-column leaderboard */}
            <div className={styles.leaderboardLeft}>
              {/* Column 1: places 1-4 */}
              <ol className={styles.leaderboardColumnLeft}>
                {sortedPlayers.slice(0, 4).map((p, i) => (
                  <li key={p.id}>
                    <img
                      src={
                        new URL(
                          `../assets/places/place-${i + 1}.png`,
                          import.meta.url
                        ).href
                      }
                      alt={`${i + 1} place`}
                      className={styles.placeIcon}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <img
                      src={avatarMap[p.id] || avatarMap["admin"]}
                      alt={p.name}
                      className={styles.playerAvatar}
                    />
                    <span className={styles.playerName}>{p.name}</span>
                    <span className={styles.playerScore}>{p.score}</span>
                  </li>
                ))}
              </ol>

              {/* Column 2: places 5-8 */}
              <ol className={styles.leaderboardColumnRight}>
                {sortedPlayers.slice(4, 8).map((p, i) => (
                  <li key={p.id}>
                    <img
                      src={
                        new URL(
                          `../assets/places/place-${i + 5}.png`,
                          import.meta.url
                        ).href
                      }
                      alt={`${i + 5} place`}
                      className={styles.placeIcon}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <img
                      src={avatarMap[p.id] || avatarMap["admin"]}
                      alt={p.name}
                      className={styles.playerAvatar}
                    />
                    <span className={styles.playerName}>{p.name}</span>
                    <span className={styles.playerScore}>{p.score}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right: current game + game log */}
            <div className={styles.gameLogContainer}>
              {currentGame && (
                <>
                  <h2 className={styles.currentGameTitle}>Current Game</h2>
                  <img
                    src={gameIcons[currentGame] || null}
                    alt="Current Game"
                    className={styles.currentGameIcon}
                  />{" "}
                  <h2 className={styles.currentGameTitle}>{currentGame}</h2>
                </>
              )}
            </div>
          </div>
        )}

        {/* Store */}
        {activeTab === "store" && (
          <div className={styles.card}>
            <img className={styles.shopTitle} src={ShopTitle} alt="shop" />
            <div>
              <button
                onClick={handleRollStore}
                disabled={rolling || powerUps.length === 0}
                className={styles.rollBtn}
              >
                {rolling ? "Rolling..." : "🎲 Roll Store"}
              </button>
            </div>

            {currentStore.length === 0 ? (
              <p>No power-ups available. Roll the store!</p>
            ) : (
              <div className={styles.storeGrid}>
                {currentStore.map((p) => (
                  <div key={p.id} className={styles.powerupCard}>
                    <img
                      src={powerUpImages[p.id] || p.image || ""}
                      alt={p.name}
                      className={styles.powerupImg}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <h3>{p.title}</h3>
                    <h4>{p.price} pts</h4>
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
