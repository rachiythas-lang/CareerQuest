// ข้อมูลสถานะและระบบการเงินของผู้เล่นหลักประจำโปรเจกต์
let player = {
    name: "James",
    career: "",
    salary: 0,
    skill: "",
    money: 5000,
    saving: 0,
    expense: 0,
    health: 100,
    stress: 0,
    score: 0
};

// โหลดข้อมูลอาชีพที่เลือกมาจาก LocalStorage ในหน้าก่อนหน้า
let careerData = JSON.parse(localStorage.getItem("career"));

if (careerData) {
    player.career = careerData.name;
    player.salary = careerData.salary;
    player.skill = careerData.skill;
}

// ฟังก์ชันอัปเดตตัวเลขเงินแสดงผลบนหน้าจอเว็บ
function updateMoney() {
    const moneyEl = document.getElementById("money");
    if (moneyEl) {
        moneyEl.innerHTML = player.money.toLocaleString(); // ปรับให้แสดงคอมม่าคั่นหลักพันให้สวยงาม
    }
}

// ฟังก์ชันรับเงินเดือนเมื่อเดินวนครบรอบกระดาน
function receiveSalary() {
    player.money += player.salary;
    alert(`💰 เงินเดือนเข้า +${player.salary.toLocaleString()} บาท`);
    updateMoney();
    updateScoreUI(); // อัปเดตคะแนนรวมบนหน้าจอทันทีเมื่อสเตตัสเปลี่ยน
}

// ฟังก์ชันจ่ายค่าใช้จ่ายหรือหักเงินเมื่อตกช่องอีเวนต์หักเงิน
function payExpense(amount, text) {
    if (player.money >= amount) {
        player.money -= amount;
        player.expense += amount;
        alert(`💸 ${text}\nเสียเงิน ${amount.toLocaleString()} บาท`);
    } else {
        alert("⚠️ เงินไม่พอจ่าย!");
    }
    updateMoney();
    updateScoreUI();
}

// ฟังก์ชันสูตรคำนวณคะแนนรวม 100 คะแนนเต็มตามโจทย์การประกวด
function calculateScore() {
    let careerScore = Math.min(40, player.salary / 150);
    let financeScore = Math.min(30, player.saving / 500);
    let lifeScore = Math.max(0, 20 - player.stress / 5);
    let skillScore = 10;

    player.score = Math.floor(careerScore + financeScore + lifeScore + skillScore);
    return player.score;
}

// ฟังก์ชันเสริมสำหรับอัปเดตคะแนนรวมขึ้นไปแสดงบนหน้ากระดาน
function updateScoreUI() {
    const scoreEl = document.getElementById("score-display");
    if (scoreEl) {
        scoreEl.innerHTML = calculateScore();
    }
}
