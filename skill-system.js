let skills = {
    coding: 20,
    accounting: 20,
    marketing: 20,
    communication: 20,
    saving: 20
};

let careerLevel = 1;
let exp = 0;

// เพิ่ม Skill
function addSkill(type, amount) {
    if (skills[type] !== undefined) {
        skills[type] += amount;
        if (skills[type] > 100) skills[type] = 100;

        addEXP(15); // ได้รับ EXP เมื่อเพิ่มสกิล
        updateSkillUI();
    }
}

// เพิ่ม EXP และเช็กการ Level Up
function addEXP(amount) {
    exp += amount;
    if (exp >= 100) {
        exp -= 100;
        careerLevel++;
        levelUp();
    }
    updateSkillUI();
}

// เมื่อ Level Up
function levelUp() {
    alert("🎉 Level Up!\nCareer Level " + careerLevel + "\nเงินเดือนเพิ่มขึ้น +1,000 บาท!");
    
    // เพิ่มเงินเดือนให้ผู้เล่น (ถ้ามีตัวแปร player)
    if (typeof player !== "undefined" && player.salary !== undefined) {
        player.salary += 1000;
    }
}

// อัปเดต UI หน้าจอ
function updateSkillUI() {
    if (document.getElementById("coding")) document.getElementById("coding").innerText = skills.coding;
    if (document.getElementById("accounting")) document.getElementById("accounting").innerText = skills.accounting;
    if (document.getElementById("marketing")) document.getElementById("marketing").innerText = skills.marketing;
    if (document.getElementById("communication")) document.getElementById("communication").innerText = skills.communication;
    if (document.getElementById("saving")) document.getElementById("saving").innerText = skills.saving;
    if (document.getElementById("level")) document.getElementById("level").innerText = careerLevel;
}