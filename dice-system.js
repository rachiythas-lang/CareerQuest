const socket = io();
const roomCode = localStorage.getItem("roomCode") || "AB29XZ";
const username = localStorage.getItem("username") || "Player";

// เข้าร่วมห้อง Socket ทันทีที่โหลด
socket.emit("joinRoom", { 
    roomCode: roomCode, 
    username: username, 
    career: localStorage.getItem("career") || "Programmer" 
});

// กดทอยเต๋า
function rollDice() {
    socket.emit("rollDice", roomCode);
}

// รับผลลูกเต๋าจาก Server
socket.on("diceResult", (data) => {
    showDiceAnimation(data.number, () => {
        if (data.playerId === socket.id) {
            movePlayer(data.number);
        }
    });
});

// อัปเดต Turn UI
socket.on("turnUpdate", (data) => {
    let turnStatus = document.getElementById("turn-status");
    if (data.currentPlayerId === socket.id) {
        if (turnStatus) turnStatus.innerText = "🎯 ถึงตาของคุณแล้ว! กด Roll Dice ได้เลย";
        document.getElementById("dice-btn")?.removeAttribute("disabled");
    } else {
        if (turnStatus) turnStatus.innerText = "⏳ รอตาของผู้เล่นท่านอื่น...";
        document.getElementById("dice-btn")?.setAttribute("disabled", "true");
    }
});

// Error handling
socket.on("errorMessage", (msg) => {
    alert(msg);
});

// แสดง Animation ลูกเต๋า
function showDiceAnimation(number, callback) {
    let dice = document.getElementById("dice");
    if (!dice) return;

    dice.classList.add("roll");
    setTimeout(() => {
        dice.innerHTML = getDiceEmoji(number);
        dice.classList.remove("roll");
        if (callback) callback();
    }, 700);
}

function getDiceEmoji(num) {
    const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
    return diceEmojis[num - 1] || "🎲";
}