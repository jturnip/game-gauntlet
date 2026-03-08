// generateAchievements.js
import { createCanvas, loadImage } from "canvas";
import fs from "fs";

const achievements = [
  { name: "Speed Demon", points: 50, color: "#FF0000" },
  { name: "Master Builder", points: 100, color: "#00AAFF" },
  // add all your achievements here
];

for (const ach of achievements) {
  const width = 400;
  const height = 100;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#222";
  ctx.fillRect(0, 0, width, height);

  // Achievement bar
  ctx.fillStyle = ach.color;
  ctx.fillRect(10, 60, ach.points * 3, 20); // scale points to width

  // Text
  ctx.fillStyle = "#FFF";
  ctx.font = "bold 24px Sans";
  ctx.fillText(ach.name, 10, 35);
  ctx.fillText(`${ach.points} pts`, width - 100, 35);

  // Save file
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(`./achievement_images/${ach.name}.png`, buffer);
  console.log(`Created image for: ${ach.name}`);
}