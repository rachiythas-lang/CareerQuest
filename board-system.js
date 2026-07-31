// สร้างช่องกระดาน 40 ช่อง (0 - 39)
const tileTypes = ["salary", "skill", "event", "saving", "opportunity", "investment"];
const tileNames = {
    start: "🏁 Start",
    salary: "💰 Salary",
    skill: "📚 Skill",
    event: "🎴 Event",
    saving: "🏦 Saving",
    opportunity: "⭐ Opportunity",
    investment: "📈 Investment",
    finish: "🏆 Finish"
};

const board = [];

// สร้างช่อง 0 ถึง 39 อัตโนมัติ
for (let i = 0; i < 40; i++) {
    if (i === 0) {
        board.push({ id: 0, type: "start", name: tileNames.start });
    } else if (i === 39) {
        board.push({ id: 39, type: "finish", name: tileNames.finish });
    } else {
        let type = tileTypes[(i - 1) % tileTypes.length];
        board.push({ id: i, type: type, name: tileNames[type] });
    }
}

let playerPosition = 0;

// ทอยลูกเต๋า
function rollDice() {
    let dice = Math.floor(Math.random() * 6) + 1;
    alert(`🎲 คุณทอยลูกเต๋าได้แต้ม: ${dice}`);
    movePlayer(dice);
}

// ระบบเดินหมาก
function movePlayer(step) {
    playerPosition += step;
    
    if (playerPosition >= 39) {
        playerPosition = 39;
        updatePlayerPosition();
        alert("🎉 ยินดีด้วย! คุณเดินทางถึงช่อง Finish สิ้นสุดเกม!");
        return;
    }

    updatePlayerPosition();
    checkTile();
}

// อัปเดตตำแหน่ง Avatar ในกระดาน
function updatePlayerPosition() {
    let avatar = document.getElementById("avatar");
    let targetTile = document.getElementById("tile-" + playerPosition);
    if (targetTile && avatar) {
        targetTile.appendChild(avatar);
    }
}

// เช็กว่าตกช่องอะไร แล้วทำงานตามประเภทช่อง
function checkTile() {
    let currentTile = board[playerPosition];
    console.log("ตกช่อง:", currentTile.name);

    setTimeout(() => {
        triggerTileAction(currentTile);
    }, 400);
}

// ทำงานตามประเภทช่องที่ตก
function triggerTileAction(tile) {
    switch (tile.type) {
        case "salary":
            if (typeof workAction === "function") workAction();
            break;
        case "skill":
            if (typeof addSkill === "function") addSkill("coding", 10);
            alert("📚 ตกช่อง Skill! ได้รับทักษะเพิ่มขึ้น (+10)");
            break;
        case "event":
        case "opportunity":
            if (typeof drawCard === "function") drawCard();
            break;
        case "saving":
            if (typeof depositMoney === "function") depositMoney(1000);
            break;
        case "investment":
            if (typeof invest === "function") invest("stock");
            break;
    }
}