import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  doc,
  onSnapshot,
  updateDoc,
  increment,
  arrayUnion,
  runTransaction,
  arrayRemove,
} from "firebase/firestore";

import "../styles/PlayerPowerUps.css";

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



export default function PlayerPowerUps({ playerId }) {
  const [activeTab, setActiveTab] = useState("shop");
  const [storePowerUps, setStorePowerUps] = useState([]);
  const [selectedPowerUp, setSelectedPowerUp] = useState(null);
  const [currentRollId, setCurrentRollId] = useState(null);
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionMenuVisible, setActionMenuVisible] = useState(false);
  const [message, setMessage] = useState("");
  const inventory = playerData?.inventory || [];

  async function addLog(message) {
    try {
      await addDoc(collection(db, "gameLog"), {
        message,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error adding log:", error);
    }
  }

  // 🔹 Listen to current store (admin rolls update this)
  useEffect(() => {
    const storeRef = doc(db, "currentStore", "active");
    const unsub = onSnapshot(storeRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStorePowerUps(data.powerUps || []);
        setCurrentRollId(data.rollId || null);
      } else {
        setStorePowerUps([]);
      }
    });
    return () => unsub();
  }, []);

  // 🔹 Listen to player data
  useEffect(() => {
    if (!playerId) return;
    const playerRef = doc(db, "players", playerId);
    const unsub = onSnapshot(playerRef, (docSnap) => {
      if (docSnap.exists()) {
        setPlayerData(docSnap.data());
        setLoading(false);
      }
    });
    return () => unsub();
  }, [playerId]);
  // Inventory use/dsestroy buttons

  async function handleUseOrDestroy(actionType) {
    if (!selectedPowerUp) return;

    try {
      // Remove the power-up from player's inventory in Firestore
      const playerRef = doc(db, "players", playerId);
      await updateDoc(playerRef, {
        inventory: arrayRemove(selectedPowerUp),
      });

      // Log the action
      await addLog(
        `${playerName} ${actionType === "use" ? "used" : "destroyed"} the ${
          selectedPowerUp.title
        } power-up.`
      );
    } catch (error) {
      console.error("Error using/destroying power-up:", error);
    } finally {
      // ✅ Always close menu and clear selection
      setActionMenuVisible(false);
      setSelectedPowerUp(null);
    }
  }

  function handleSelectPowerUp(pu) {
    setSelectedPowerUp(pu);
    setActionMenuVisible(true);
  }
  // 🔹 Handle Buy
  const handleBuy = async (pu) => {
    if (!playerData || !currentRollId) return;
    setMessage("");

    const playerRef = doc(db, "players", playerId);
    const currentScore = playerData.score || 0;
    const inventory = playerData.inventory || [];
    const lastRollBought = playerData.lastRollBought || null;

    // --- Checks ---
    if (inventory.length >= 4) {
      setMessage("❌ Your inventory is full (max 4 power-ups).");
      return;
    }
    if (currentScore < pu.price) {
      setMessage("❌ Not enough points to buy this power-up!");
      return;
    }

    console.log("Selected Power-Up data:", selectedPowerUp);

    // --- Update Firestore ---
    try {
      await updateDoc(playerRef, {
        score: currentScore - pu.price,
        inventory: arrayUnion({
          id: pu.id,
          title: pu.title,
          image: pu.id,
          rarity: pu.rarity,
          price: pu.price,
          description: pu.description, // ✅ Add this line
        }),
        lastRollBought: currentRollId,
      });
      setMessage(`✅ You bought ${pu.title}!`);
    } catch (err) {
      console.error("Error buying power-up:", err);
      setMessage("⚠️ Failed to buy power-up. Try again.");
    }
  };

  if (loading) return <p>Loading player data...</p>;

  return (
    <div className="player-powerups">
      <h2>Power-Ups</h2>

      {/* 🧭 Tab Navigation */}
      <div className="tabs">
        <button
          className={activeTab === "shop" ? "tab active" : "tab"}
          onClick={() => setActiveTab("shop")}
        >
          Shop
        </button>
        <button
          className={activeTab === "inventory" ? "tab active" : "tab"}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory
        </button>
      </div>

      {/* 🛒 SHOP TAB */}
      {activeTab === "shop" && (
        <div className="powerup-grid">
          {storePowerUps.length === 0 ? (
            <p>No power-ups available right now!</p>
          ) : (
            storePowerUps.map((pu) => (
              <div
                key={pu.id}
                className={`powerup-card ${
                  selectedPowerUp?.id === pu.id ? "selected" : ""
                }`}
                onClick={() => setSelectedPowerUp(pu)}
              >
                <img
                  src={powerUpImages[pu.image]}
                  alt={pu.title}
                  className="powerup-image"
                />
                <p className="powerup-title">{pu.title}</p>
                <p className="powerup-price">{pu.price} pts</p>

                {selectedPowerUp?.id === pu.id && (
                  <div className="powerup-actions">
                    <button onClick={() => handleBuy(pu)}>Buy</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* 🎒 INVENTORY TAB */}
      {activeTab === "inventory" && (
        <div className="inventory-grid">
          {inventory.length === 0 ? (
            <p>No power-ups in your inventory.</p>
          ) : (
            inventory.map((pu, i) => (
              <div
                key={i}
                className="powerup-card"
                onClick={() => handleSelectPowerUp(pu)}
              >
                <img
                  src={powerUpImages[pu.image]}
                  alt={pu.title}
                  className="powerup-image"
                />
                <p className="powerup-title">{pu.title}</p>
              </div>
            ))
          )}
        </div>
      )}
      {actionMenuVisible && selectedPowerUp && (
        <div className="action-popup">
          <div className="popup-content">
            <h3>{selectedPowerUp.title}</h3>
            {selectedPowerUp.description && (
              <p className="popup-description">{selectedPowerUp.description}</p>
            )}
            <p>What would you like to do with this power-up?</p>
            <div className="popup-buttons">
              <button onClick={() => handleUseOrDestroy("use")}>Use</button>
              <button onClick={() => handleUseOrDestroy("destroy")}>
                Destroy
              </button>
              <button onClick={() => setActionMenuVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
