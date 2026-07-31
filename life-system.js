let life = {
    health: 80,
    stress: 20,
    happiness: 70,
    energy: 80
};

// เปลี่ยนค่าสถานะพร้อมจำกัดไม่ให้เกิน 100 หรือต่ำกว่า 0
function changeLife(type, value) {
    if (life[type] !== undefined) {
        life[type] += value;

        if (life[type] > 100) life[type] = 100;
        if (life[type] < 0) life[type] = 0;

        updateLifeUI();
    }
}

// แอ็กชัน: ทำงาน
function workAction() {
    if (typeof player !== "undefined" && player.salary) {
        player.money += player.salary;
    }
    changeLife("stress", 15);
    changeLife("energy", -10);
    alert("💼 ทำงาน! ได้รับเงินเดือน แต่ความเครียดเพิ่มขึ้น (+15) และพลังงานลดลง (-10)");
}

// แอ็กชัน: พักผ่อน
function restAction() {
    changeLife("stress", -15);
    changeLife("energy", 20);
    changeLife("happiness", 10);
    alert("🏖 ได้พักผ่อน! ความเครียดลดลง (-15) พลังงานเพิ่ม (+20) และมีความสุขขึ้น (+10)");
}

// แอ็กชัน: ไปหาหมอ/รักษาตัว
function medicalAction() {
    if (typeof player !== "undefined" && player.money >= 2000) {
        player.money -= 2000;
        changeLife("health", 20);
        alert("🏥 รักษาพยาบาล! เสียค่ารักษา 2,000 บาท (สุขภาพ +20)");
    } else {
        alert("❌ เงินไม่พอจ่ายค่ารักษาพยาบาล!");
    }
}

// อัปเดต UI หน้าจอ
function updateLifeUI() {
    if (document.getElementById("health")) document.getElementById("health").innerText = life.health;
    if (document.getElementById("stress")) document.getElementById("stress").innerText = life.stress;
    if (document.getElementById("happiness")) document.getElementById("happiness").innerText = life.happiness;
    if (document.getElementById("energy")) document.getElementById("energy").innerText = life.energy;
}