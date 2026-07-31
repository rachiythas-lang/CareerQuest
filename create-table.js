const db = require("../db");

db.serialize(() => {
  // 1. ตารางห้องเล่นเกม (rooms)
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_code TEXT UNIQUE,
      room_name TEXT,
      max_players INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. ตารางผู้เล่น (players)
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_code TEXT,
      username TEXT,
      career TEXT,
      money INTEGER DEFAULT 5000,
      saving INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0
    )
  `);

  // 3. ตารางประวัติการเล่น (games)
  db.run(`
    CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      room_code TEXT,
      winner TEXT,
      final_score INTEGER,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error("❌ Error creating tables:", err.message);
    } else {
      console.log("✅ Database Tables Created Successfully!");
    }
  });
});