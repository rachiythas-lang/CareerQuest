const express = require('express');
const app = express();
const path = require('path');

// 1. ชี้ Static ไปที่โฟลเดอร์ client (ถอยออกจาก server 1 ชั้น แล้วเข้า client)
app.use(express.static(path.join(__dirname, '../client')));

// 2. ส่งไฟล์ index.html จากโฟลเดอร์ client มาแสดงผล
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// 3. กำหนด Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});