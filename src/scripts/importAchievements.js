// importAchievements.js (ES Module version)
import admin from "firebase-admin";
import { readFileSync } from "fs";

// Replace with the path to your service account key JSON
const serviceAccount = JSON.parse(readFileSync("./serviceAccountKey.json"));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// === Your achievements data ===
const achievements = [

  // --- SMASH ---
  {
    title: "People Pleaser",
    description: "Get the crowd to cheer your name",
    category: "Smash",
    image: "people_pleaser.png",
    points: 3
  },
  {
    title: "GG EZ Clapz",
    description: "Win with 3 stocks remaining",
    category: "Smash",
    image: "gg_ez_clapz.png",
    points: 5
  },
  {
    title: "The Homie Stock",
    description: "Give a stock and still win",
    category: "Smash",
    image: "homie_stock.png",
    points: 4
  },
  {
    title: "The Dishwasher",
    description: "Land a 0-to-death combo",
    category: "Smash",
    image: "dishwasher.png",
    points: 5
  },
  {
    title: "Rage Baited",
    description: "Taunt then KO within 5 seconds",
    category: "Smash",
    image: "rage_baited.png",
    points: 5
  },
  {
    title: "Get Spiked",
    description: "Spike an opponent off the map",
    category: "Smash",
    image: "get_spiked.png",
    points: 2
  },

  // --- QUIPLASH ---
  {
    title: "Crickets",
    description: "Get zero votes on your quip",
    category: "Quiplash",
    image: "crickets.png",
    points: 3
  },
  {
    title: "Too Soon Bro",
    description: "Win a round with a joke from the trip",
    category: "Quiplash",
    image: "too_soon_bro.png",
    points: 5
  },
  {
    title: "Wordplay Wizard",
    description: "Pun wins a round",
    category: "Quiplash",
    image: "wordplay_wizard.png",
    points: 2
  },
  {
    title: "Redemption Arc",
    description: "Come back from last to top 3",
    category: "Quiplash",
    image: "redemption_arc.png",
    points: 4
  },
  {
    title: "It's In The Name",
    description: "Win a round with a Quiplash",
    category: "Quiplash",
    image: "quiplash.png",
    points: 2
  },
  {
    title: "You Owe Me a Coke",
    description: "Jinx with another player",
    category: "Quiplash",
    image: "jinx.png",
    points: 4
  },

  // --- TKO ---
  {
    title: "Why Are You Booing Me",
    description: "Your own designs face off in finals",
    category: "TKO",
    image: "booing.png",
    points: 3
  },
  {
    title: "He's a Fake Santa",
    description: "Copy someone's drawing and it wins a round",
    category: "TKO",
    image: "fake_santa.png",
    points: 4
  },
  {
    title: "Double Drip",
    description: "Win two matchups in a row",
    category: "TKO",
    image: "double_drip.png",
    points: 3
  },
  {
    title: "Running Joke",
    description: "Your slogan is used in 3+ rounds",
    category: "TKO",
    image: "running_joke.png",
    points: 2
  },
  {
    title: "A Real Shakespeare",
    description: "Most slogans used",
    category: "TKO",
    image: "shakespeare.png",
    points: 3
  },
  {
    title: "Picasso Mode",
    description: "Most drawings used",
    category: "TKO",
    image: "picasso.png",
    points: 3
  },

  // --- PARTY ANIMALS ---
  {
    title: "Clingy Ex",
    description: "Hold another player for 10 seconds",
    category: "Party Animals",
    image: "clingy_ex.png",
    points: 4
  },
  {
    title: "Toxic Ex",
    description: "Grab someone and self-destruct",
    category: "Party Animals",
    image: "toxic_ex.png",
    points: 3
  },
  {
    title: "Make Love Not War",
    description: "Win a round with 0 KOs",
    category: "Party Animals",
    image: "peaceful.png",
    points: 3
  },
  {
    title: "Gandalf Recovery",
    description: "Get thrown off and still win",
    category: "Party Animals",
    image: "gandalf.png",
    points: 4
  },
  {
    title: "Gorilla Mode",
    description: "Win as the gorilla",
    category: "Party Animals",
    image: "gorilla_mode.png",
    points: 3
  },
  {
    title: "Hey That's Me",
    description: "Use same skin as winner",
    category: "Party Animals",
    image: "same_skin.png",
    points: 1
  },
  {
    title: "Gorilla Warfare",
    description: "Win as non-gorilla",
    category: "Party Animals",
    image: "gorilla_warfare.png",
    points: 5
  },

  // --- PONG ---
  {
    title: "Chicken Dinner",
    description: "Hit the game winning shot",
    category: "Pong",
    image: "chicken_dinner.png",
    points: 3
  },
  {
    title: "The Prophecy",
    description: "Call your next shot correctly",
    category: "Pong",
    image: "prophecy.png",
    points: 4
  },
  {
    title: "Island in the Sun",
    description: "Call and hit an island shot",
    category: "Pong",
    image: "island.png",
    points: 4
  },
  {
    title: "Boioioioing",
    description: "Hit a bounce shot",
    category: "Pong",
    image: "bounce.png",
    points: 3
  },
  {
    title: "That's The Way I Like It",
    description: "Call rerack and hit a cup",
    category: "Pong",
    image: "rerack.png",
    points: 2
  },
  {
    title: "Resurrection Sunday",
    description: "Miss 3 in a row then hit 2 in a row",
    category: "Pong",
    image: "resurrection.png",
    points: 5
  },

  // --- CORNHOLE ---
  {
    title: "Quatro Leches",
    description: "Sink four bags in a row",
    category: "Cornhole",
    image: "quatro_leches.png",
    points: 5
  },
  {
    title: "Backpack Backpack!",
    description: "Score zero points in a game",
    category: "Cornhole",
    image: "backpack.png",
    points: 5
  },
  {
    title: "Dora the Explora",
    description: "Score all team points",
    category: "Cornhole",
    image: "carry.png",
    points: 5
  },
  {
    title: "Stalemate",
    description: "Both teams land all four bags",
    category: "Cornhole",
    image: "stalemate.png",
    points: 3
  },
  {
    title: "Epic Trickshotz",
    description: "Behind-the-back or under-leg shot",
    category: "Cornhole",
    image: "trickshot.png",
    points: 5
  },
  {
    title: "Nothing But Hole",
    description: "Clean swish with no board touch",
    category: "Cornhole",
    image: "swish.png",
    points: 2
  },
  {
    title: "Patriots vs Falcons",
    description: "Win after 7+ deficit",
    category: "Cornhole",
    image: "comeback.png",
    points: 4
  }

];

// Function to import achievements
async function importAchievements() {
  for (const achievement of achievements) {
    const { title, ...fields } = achievement; // name is doc ID
    await db.collection("achievements").doc(title).set(fields);
    console.log(`Imported achievement: ${title}`);
  }
  console.log("All achievements imported!");
}

// Run the script
importAchievements().catch((err) => {
  console.error("Error importing achievements:", err);
});