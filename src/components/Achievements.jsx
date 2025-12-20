import React, { useState } from "react";
import "../styles/Achievements.css";
import Ach10 from "../assets/achievements/Asset 10@300xewdrsfwe.png";
import Ach12 from "../assets/achievements/Asset 12@300xewdrsfwe.png";
import Ach15 from "../assets/achievements/Asset 15@300xewdrsfwe.png";
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
import Ach60 from "../assets/achievements/Asset 60@300xewdrsfwe.png";
import Title from "../assets/achievements/Asset 65@300xewdrsfwe.png";

// Example achievements — replace image paths with your PNGs
const achievementsData = [
  
  // Quiplash 'Chieves
  {
    id: "oops_still_won",
    title: "Oops... Still Won",
    category: "Quiplash",
    points: 2,
    image: Ach31,
  },
  {
    id: "jinx",
    title: "Jinx!",
    category: "Quiplash",
    points: 2,
    image: Ach32,
  },
  {
    id: "silent_but_deadly",
    title: "Silent But Deadly",
    category: "Quiplash",
    points: 2,
    image: Ach33,
  },
  {
    id: "impressively_not_funny",
    title: "Impressively Not Funny",
    category: "Quiplash",
    points: 3,
    image: Ach34,
  },
    {
    id: "secret_achievement1",
    title: "Secret Achievement",
    category: "Quiplash",
    points: 2,
    image: Ach50,
  },
 // Spoons 

  {
    id: "last_but_not_least",
    title: "Last But Not Least",
    category: "Spoons",
    points: 2,
    image: Ach35,
  },
{
    id: "early_bird_gets_the_spoon",
    title: "Early Bird Gets The Spoon",
    category: "Spoons",
    points: 1,
    image: Ach36,
  },
  {
    id: "sucking",
    title: "Sucking",
    category: "Spoons",
    points: 1,
    image: Ach37,
  },
  {
    id: "reliable_peers",
    title: "Reliable Peers",
    category: "Spoons",
    points: 2,
    image: Ach38,
  },
    {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Spoons",
    points: 2,
    image: Ach52,
  },

// Wii Sports Basketball

 {
    id: "nothin_but_air",
    title: "Nothin' But Air",
    category: "Wii Sports Basketball",
    points: 4,
    image: Ach39,
  },
   {
    id: "hot_streak",
    title: "Hot Streak",
    category: "Wii Sports Basketball",
    points: 1,
    image: Ach40,
  },
   {
    id: "barely_victorious",
    title: "Barely Victorious",
    category: "Wii Sports Basketball",
    points: 2,
    image: Ach41,
  },
   {
    id: "undeniably_goated",
    title: "Undeniably GOATed",
    category: "Wii Sports Basketball",
    points: 5,
    image: Ach42,
  },
    {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Wii Sports Basketball",
    points: 2,
    image: Ach48,
  },
  //Gang Beasts
   {
    id: "certified_menace_to_society",
    title: "Certified Menace to Society",
    category: "Gang Beasts",
    points: 2,
    image: Ach43,
  },
   {
    id: "no_hands_were_thrown",
    title: "No Hands Were Thrown",
    category: "Gang Beasts",
    points: 3,
    image: Ach44,
  },
   {
    id: "mutual_yeet",
    title: "Mutual Yeet",
    category: "Gang Beasts",
    points: 2,
    image: Ach45,
  },
 {
    id: "nap_and_clap",
    title: "Nap and Clap",
    category: "Gang Beasts",
    points: 1,
    image: Ach46,
  },
    {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Gang Beasts",
    points: 2,
    image: Ach49,
  },
  //Super Smash Bros
   {
    id: "welp_that_was_easy",
    title: "Welp, That Was Easy!",
    category: "Super Smash Bros",
    points: 3,
    image: Ach47,
  },
     {
    id: "just_a_scratch_coach",
    title: "Just a Scratch, Coach",
    category: "Super Smash Bros",
    points: 3,
    image: Ach54,
  },
    {
    id: "certified_spectator",
    title: "Certified Spectator",
    category: "Super Smash Bros",
    points: 2,
    image: Ach55,
  },
    {
    id: "so_close_yet_so_far",
    title: "So Close, Yet So Far...",
    category: "Super Smash Bros",
    points: 1,
    image: Ach56,
  },
      {
    id: "touch_grass",
    title: "Touch Grass",
    category: "Super Smash Bros",
    points: 2,
    image: Ach57,
  },
    {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Super Smash Bros",
    points: 2,
    image: Ach53,
  },
  // Mario Kart
  {
    id: "see_ya_nerds",
    title: "See Ya, Nerds",
    category: "Mario Kart",
    points: 3,
    image: Ach10,
  },
  {
    id: "beep_beep",
    title: "Beep Beep!",
    category: "Mario Kart",
    points: 3,
    image: Ach12,
  },
  {
    id: "secret_service",
    title: "Secret Service",
    category: "Mario Kart",
    points: 2,
    image: Ach15,
  },
    {
    id: "thats_pitiful",
    title: "That's Pitiful!",
    category: "Mario Kart",
    points: 3,
    image: Ach60,
  },
    {
    id: "secret_achievement",
    title: "Secret Achievement",
    category: "Mario Kart",
    points: 2,
    image: Ach51,
  },
  // General
  {
    id: "lucky_you",
    title: "Lucky You!",
    category: "General",
    points: 1,
    image: Ach29,
  },
  {
    id: "duel_master",
    title: "Duel Master",
    category: "General",
    points: 4,
    image: Ach30,
  },
  // Power Ups
  {
    id: "big_spender",
    title: "Big Spender",
    category: "Power Ups",
    points: 2,
    image: Ach17,
  },
  {
    id: "dill_or_no_dill",
    title: "Dill or No Dill",
    category: "Power Ups",
    points: 1,
    image: Ach19,
  },
  {
    id: "unfinished_business",
    title: "Unfinished Business",
    category: "Power Ups",
    points: 4,
    image: Ach20,
  },
  {
    id: "clutch_foodling",
    title: "Clutch Foodling",
    category: "Power Ups",
    points: 1,
    image: Ach21,
  },
  {
    id: "explosive_purchase",
    title: "Explosive Purchase",
    category: "Power Ups",
    points: 3,
    image: Ach18,
  },
  // Achievement Acheicneicen
  {
    id: "variety_is_the_spice",
    title: "Variety is the Spice",
    category: "Achievements",
    points: 4,
    image: Ach22,
  },
  {
    id: "achievement_hunter",
    title: "Achievement Hunter",
    category: "Achievements",
    points: 2,
    image: Ach23,
  },
  {
    id: "achievement_king",
    title: "Achievement King",
    category: "Achievements",
    points: 3,
    image: Ach24,
  },
  // Special

  {
    id: "wielder_of_chaos",
    title: "Wielder of Chaos",
    category: "Special",
    points: 2.5,
    image: Ach26,
  },
  {
    id: "unlucky_you",
    title: "Unlucky You!",
    category: "Special",
    points: -2,
    image: Ach27,
  },
  {
    id: "wheels_favorite",
    title: "Wheels's Favorite",
    category: "Special",
    points: 2,
    image: Ach28,
  },
    {
    id: "frick_you",
    title: "Frick You",
    category: "Special",
    points: 3.1,
    image: Ach25,
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
