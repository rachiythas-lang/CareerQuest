// รายชื่อผู้เล่นจำลองและสถานะตำแหน่งประจำกระดานเกม STEP 21
let players = [
    {
        id: 1,
        name: "James",
        avatar: "🧑‍💻",
        career: "Programmer",
        position: 0,
        money: 5000
    },
    {
        id: 2,
        name: "Player 2",
        avatar: "👩‍🏫",
        career: "Teacher",
        position: 0,
        money: 5000
    },
    {
        id: 3,
        name: "Player 3",
        avatar: "👨‍🍳",
        career: "Chef",
        position: 0,
        money: 5000
    }
];

// ดึงข้อมูลอาชีพของ James (ผู้เล่นหลัก) ที่เลือกไว้ก่อนหน้ามาอัปเดตสกินตัวละครตัวที่ 1
let storedCareer = JSON.parse(localStorage.getItem("career"));
if (storedCareer) {
    const iconsMap = {
        "Chef": "👨‍🍳", "Programmer": "💻", "Teacher": "👩‍🏫", "Farmer": "🌾",
        "Electrician": "⚡", "Graphic Designer": "🎨", "Nurse": "🏥", "Photographer": "📷"
    };
    players[0].career = storedCareer.name;
    players[0].avatar = iconsMap[storedCareer.name] || "🧑‍💻";
}

let currentTurn = 0;

// ฟังก์ชันสลับผู้เล่นไปเทิร์นถัดไป
function nextTurn() {
    currentTurn++;
    if (currentTurn >= players.length) {
        currentTurn = 0;
    }
    // อัปเดตชื่อผู้เล่นที่มีสิทธิ์ทอดเต๋าขึ้นแสดงบนบอร์ด
    document.getElementById("turn").innerHTML = players[currentTurn].name;
}

// ฟังก์ชันสั่งเลื่อนตำแหน่งตัวหมากตามแต้มเต๋า
function movePlayer(step) {
    let player = players[currentTurn];
    player.position += step;

    // กฎกติกา Prototype STEP 21: ถ้าเดินวนครบรอบหรือเกินช่องที่ 40 ให้ปัดวนกลับมาเริ่มรอบใหม่ (สไตล์เกมเศรษฐี)
    if (player.position > 40) {
        player.position = player.position - 40;
        player.money += 2000; // ได้รับโบนัสผ่านรอบ
        alert(`💰 ${player.name} เดินครบรอบ ได้รับเงินเดือนประจำเทิร์น +2,000 บาท!`);
    }

    renderPlayers();
    
    // ตรวจสอบเงื่อนไขช่องพิเศษจั่วการ์ด (สืบทอดกฎกติกาจากสเต็ป 20 เมื่อตำแหน่งตกช่องหารด้วย 5 ลงตัว)
    if (player.position > 0 && player.position % 5 === 0) {
        setTimeout(() => {
            if (typeof drawCard === "function") {
                drawCard();
            }
        }, 500);
    }
}

// ฟังก์ชันวาดรูปหมากอีโมจิผู้เล่นลงไปกระจายตัวในกล่องเซลล์ช่องเดินกระดาน
function renderPlayers() {
    // ล้างตัวหมากเก่าที่ตกค้างบนหน้าจอกระดานออกให้หมดก่อน
    document.querySelectorAll(".avatar-piece").forEach(e => e.remove());

    players.forEach(player => {
        // ดึงกล่องเซลล์ช่องเดินตามตัวเลขพิกัดปัจจุบัน (ดัชนีอ้างอิงอาร์เรย์เริ่มนับจาก 0)
        let cell = document.querySelectorAll(".cell")[player.position - 1];
        
        // พิเศษ: หากผู้เล่นยังอยู่จุดเริ่มต้น (position เป็น 0) ให้ไปยืนรอที่ช่องแรกสุด หรือช่องที่ 1 ก่อนครับ
        if (player.position === 0) {
            cell = document.querySelectorAll(".cell")[0];
        }

        if (cell) {
            let avatar = document.createElement("div");
            avatar.className = "avatar-piece";
            avatar.innerHTML = player.avatar;
            cell.appendChild(avatar);
        }
    });
}
