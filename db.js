const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// เชื่อมต่อไฟล์ database.db ที่อยู่ในโฟลเดอร์ server
const dbPath = path.join(__dirname, "database.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Database Connection Error:", err.message);
  } else {
    console.log("📦 เชื่อมต่อฐานข้อมูล SQLite สำเร็จแล้ว");
  }
});

module.exports = db;