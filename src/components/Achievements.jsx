import React, { useState } from "react";
import "../styles/Achievements.css";
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

// Example achievements — replace image paths with your PNGs
const achievementsData = [
  // Pong
  {
    id: "island_in_the_sun",
    title: "Island In the Sun",
    category: "Pong",
    points: 2,
    image: Ach59,
  },
  {
    id: "finish_the_job",
    title: "Finish the Job",
    category: "Pong",
    points: 2,
    image: Ach60,
  },
  {
    id: "boing",
    title: "Boing!",
    category: "Pong",
    points: 3,
    image: Ach61,
  },
  {
    id: "were_so_in_sync",
    title: "We're So In Sync",
    category: "Pong",
    points: 1,
    image: Ach62,
  },
  {
    id: "hes_on_fire",
    title: "He's On Fire!",
    category: "Pong",
    points: 2,
    image: Ach63,
  },
  // Cornhole
  {
    id: "stalemate",
    title: "Stalemate",
    category: "Cornhole",
    points: 2,
    image: Ach50,
  },
  {
    id: "self_sabatoge",
    title: "Self-Sabatoge",
    category: "Cornhole",
    points: 1,
    image: Ach51,
  },
  {
    id: "get_out",
    title: "GET OUT!!!",
    category: "Cornhole",
    points: 1,
    image: Ach52,
  },
  {
    id: "nothing_but_hole",
    title: "Nothing But Hole",
    category: "Cornhole",
    points: 4,
    image: Ach53,
  },
  {
    id: "epic_trickshotz",
    title: "Epic Trickshotz",
    category: "Cornhole",
    points: 3,
    image: Ach54,
  },
  // Stick Fight
  {
    id: "pacifist_victory",
    title: "Pacifist Victory",
    category: "Stick Fight",
    points: 3,
    image: Ach45,
  },
  {
    id: "snake_charmer",
    title: "Snake Charmer",
    category: "Stick Fight",
    points: 1,
    image: Ach46,
  },
  {
    id: "hat_trick",
    title: "Hat Trick",
    category: "Stick Fight",
    points: 2,
    image: Ach47,
  },
  {
    id: "melee_combatant",
    title: "Melee Combatant",
    category: "Stick Fight",
    points: 3,
    image: Ach48,
  },
  {
    id: "weapon_of_choice",
    title: "Weapon Of Choice",
    category: "Stick Fight",
    points: 1,
    image: Ach49,
  },
  // Geoguesser
  {
    id: "2000_lightyears_away",
    title: "2000 Lightyears Away",
    category: "Geoguesser",
    points: 2,
    image: Ach40,
  },
  {
    id: "one_and_done",
    title: "One And Done",
    category: "Geoguesser",
    points: 2,
    image: Ach41,
  },
  {
    id: "close_call",
    title: "Close Call",
    category: "Geoguesser",
    points: 1,
    image: Ach42,
  },
  {
    id: "cartographer",
    title: "Cartographer",
    category: "Geoguesser",
    points: 3,
    image: Ach43,
  },
  {
    id: "pinpoint_accuracy",
    title: "Pinpoint Accuracy",
    category: "Geoguesser",
    points: 5,
    image: Ach44,
  },
  // Overcooked 2
  {
    id: "hot_caliente",
    title: "Hot Caliente!",
    category: "Overcooked 2",
    points: 1,
    image: Ach17,
  },
  {
    id: "kitchen_catastrophe",
    title: "Kitchen Catastrophe",
    category: "Overcooked 2",
    points: 2,
    image: Ach18,
  },
  {
    id: "perfectly_cooked",
    title: "Perfectly Cooked",
    category: "Overcooked 2",
    points: 3,
    image: Ach19,
  },
  {
    id: "three_piece_combo",
    title: "Three-Piece Combo",
    category: "Overcooked 2",
    points: 2,
    image: Ach20,
  },
  {
    id: "michelin_stars",
    title: "Michelin Stars",
    category: "Overcooked 2",
    points: 3,
    image: Ach21,
  },
  // Quiplash 'Chieves
  {
    id: "what_are_the_odds",
    title: "What are the odds?",
    category: "Quiplash",
    points: 2,
    image: Ach1,
  },
  {
    id: "one_hit_wonder",
    title: "One Hit Wonder",
    category: "Quiplash",
    points: 2,
    image: Ach12,
  },
  {
    id: "silent_majority",
    title: "Silent Majority",
    category: "Quiplash",
    points: 4,
    image: Ach13,
  },
  {
    id: "safety_dance",
    title: "Safety Dance",
    category: "Quiplash",
    points: 3,
    image: Ach14,
  },
  {
    id: "its_in_the_name",
    title: "It's In The Name",
    category: "Quiplash",
    points: 2,
    image: Ach15,
  },
  {
    id: "sweet_revenge",
    title: "Sweet Revenge",
    category: "Quiplash",
    points: 1,
    image: Ach16,
  },
  // Zonk 'Chieves
  {
    id: "snake_eye_savant",
    title: "Snake Eye Savant",
    category: "Zonk",
    points: 1,
    image: Ach2,
  },
  {
    id: "a_tough_start",
    title: "A Tough Start",
    category: "Zonk",
    points: 1,
    image: Ach3,
  },
  {
    id: "riskit_for_the_biskit",
    title: "Riskit For The Biskit",
    category: "Zonk",
    points: 3,
    image: Ach4,
  },
  {
    id: "holy_roller",
    title: "Holy Roller",
    category: "Zonk",
    points: 5,
    image: Ach5,
  },
  {
    id: "what_a_guy",
    title: "What A Guy",
    category: "Zonk",
    points: 2,
    image: Ach6,
  },
  // Mario Kart
  {
    id: "photo_finish",
    title: "Photo Finish",
    category: "Mario Kart",
    points: 3,
    image: Ach7,
  },
  {
    id: "american_sniper",
    title: "American Sniper",
    category: "Mario Kart",
    points: 2,
    image: Ach8,
  },
  {
    id: "blue_shell_insurance",
    title: "Blue Shell Insurance",
    category: "Mario Kart",
    points: 2,
    image: Ach9,
  },
  {
    id: "not_today",
    title: "Not Today",
    category: "Mario Kart",
    points: 1,
    image: Ach10,
  },
  {
    id: "backing_up",
    title: "Backing Up!",
    category: "Mario Kart",
    points: 3,
    image: Ach11,
  },
  // General
  {
    id: "downward_spiral",
    title: "Downward Spiral",
    category: "General",
    points: 3,
    image: Ach55,
  },
  {
    id: "lucky_you",
    title: "Lucky You!",
    category: "General",
    points: 1,
    image: Ach56,
  },
  {
    id: "rags_to_riches",
    title: "Rags to Riches",
    category: "General",
    points: 2,
    image: Ach57,
  },
  {
    id: "duel_master",
    title: "Duel Master",
    category: "General",
    points: 4,
    image: Ach58,
  },
  // Power Ups
  {
    id: "norberts_bff",
    title: "Norbert's BFF",
    category: "Power Ups",
    points: 3,
    image: Ach22,
  },
  {
    id: "big_spender",
    title: "Big Spender",
    category: "Power Ups",
    points: 2,
    image: Ach23,
  },
  {
    id: "dill_or_no_dill",
    title: "Dill or No Dill",
    category: "Power Ups",
    points: 1,
    image: Ach24,
  },
  {
    id: "good_boy",
    title: "Good Boy!",
    category: "Power Ups",
    points: 2,
    image: Ach25,
  },
  {
    id: "unfinished_business",
    title: "Unfinished Business",
    category: "Power Ups",
    points: 4,
    image: Ach26,
  },
  {
    id: "clutch_foodling",
    title: "Clutch Foodling",
    category: "Power Ups",
    points: 1,
    image: Ach27,
  },
  {
    id: "item_hoarder",
    title: "Item Hoarder",
    category: "Power Ups",
    points: 2,
    image: Ach39,
  },
  {
    id: "explosive_purchase",
    title: "Explosive Purchase",
    category: "Power Ups",
    points: 3,
    image: Ach66,
  },
  // Achievement Acheicneicen
  {
    id: "triple_dip",
    title: "Triple Dip",
    category: "Achievements",
    points: 4,
    image: Ach28,
  },
  {
    id: "variety_is_the_spice",
    title: "Variety is the Spice",
    category: "Achievements",
    points: 5,
    image: Ach29,
  },
  {
    id: "achievement_hunter",
    title: "Achievement Hunter",
    category: "Achievements",
    points: 2,
    image: Ach30,
  },
  {
    id: "achievement_king",
    title: "Achievement King",
    category: "Achievements",
    points: 3,
    image: Ach31,
  },
  {
    id: "overachiever",
    title: "Overachiever",
    category: "Achievements",
    points: 3,
    image: Ach32,
  },
  // general
  {
    id: "underdog",
    title: "Underdog",
    category: "General",
    points: 3,
    image: Ach33,
  },
  {
    id: "consistently_mid",
    title: "Consistently Mid",
    category: "General",
    points: 2,
    image: Ach34,
  },
  // Special
  {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Special",
    points: 2,
    image: Ach35,
  },
  {
    id: "wielder_of_chaos",
    title: "Wielder of Chaos",
    category: "Special",
    points: 2.5,
    image: Ach36,
  },
  {
    id: "unlucky_you",
    title: "Unlucky You!",
    category: "Special",
    points: -2,
    image: Ach37,
  },
  {
    id: "wheels_favorite",
    title: "Wheels's Favorite",
    category: "Special",
    points: 2,
    image: Ach38,
  },
];

export default function AchievementsTab() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // List of unique categories
  const categories = [
    "All",
    ...new Set(achievementsData.map((a) => a.category)),
  ];

  const filtered = achievementsData.filter(
    (a) => selectedCategory === "All" || a.category === selectedCategory
  );

  return (
    <div className="achievements-tab">
      <img className="achievements-title" src={Title} alt="Achievements" />

      {/* Category Filter */}
      <div className="achievement-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="achievements-grid">
        {filtered.map((a) => (
          <div key={a.id} className="achievement-card">
            <img
              src={a.image}
              alt={a.title}
              className="achievement-img"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
