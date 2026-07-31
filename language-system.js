// คลังข้อมูลภาษา (Dictionary)
const translations = {
    th: {
        // General & Buttons
        createRoom: "สร้างห้อง",
        joinRoom: "เข้าร่วมห้อง",
        startGame: "เริ่มเกม",
        rollDice: "🎲 ทอยลูกเต๋า",
        players: "ผู้เล่น",
        waitingTurn: "⏳ รอตาของผู้เล่นท่านอื่น...",
        yourTurn: "🎯 ถึงตาของคุณแล้ว! กด Roll Dice ได้เลย",
        
        // Stats & Dashboard
        salary: "เงินเดือน",
        saving: "เงินออม",
        investment: "การลงทุน",
        skill: "ทักษะ",
        event: "เหตุการณ์",
        winner: "🏆 ผู้ชนะ",
        score: "คะแนน",
        health: "❤️ สุขภาพ",
        stress: "😰 ความเครียด",
        happiness: "😊 ความสุข",
        energy: "⚡ พลังงาน",
        cash: "💵 เงินสด",
        deposit: "🏦 ฝาก 1k",
        stock: "📈 หุ้น",
        
        // Cards & Events
        laptopBrokenTitle: "💻 Laptop เสีย",
        laptopBrokenText: "โน้ตบุ๊กทำงานเสีย ต้องซื้อใหม่ชั่วคราว (-3,000 บาท)",
        scholarshipTitle: "🎓 ได้รับทุนการศึกษา",
        scholarshipText: "ได้รับทุนพัฒนาทักษะการทำงานฟรี (Skill +20)"
    },
    en: {
        // General & Buttons
        createRoom: "Create Room",
        joinRoom: "Join Room",
        startGame: "Start Game",
        rollDice: "🎲 Roll Dice",
        players: "Players",
        waitingTurn: "⏳ Waiting for other players...",
        yourTurn: "🎯 It's your turn! Roll the dice now",
        
        // Stats & Dashboard
        salary: "Salary",
        saving: "Saving",
        investment: "Investment",
        skill: "Skills",
        event: "Event",
        winner: "🏆 Winner",
        score: "Score",
        health: "❤️ Health",
        stress: "😰 Stress",
        happiness: "😊 Happiness",
        energy: "⚡ Energy",
        cash: "💵 Cash",
        deposit: "🏦 Deposit 1k",
        stock: "📈 Stocks",

        // Cards & Events
        laptopBrokenTitle: "💻 Laptop Broken",
        laptopBrokenText: "Your laptop broke down, urgent replacement needed (-3,000 THB)",
        scholarshipTitle: "🎓 Scholarship Awarded",
        scholarshipText: "Received a free skill development grant (Skill +20)"
    }
};

// ดึงค่าภาษาจาก LocalStorage (ค่าเริ่มต้นเป็น 'th')
let currentLanguage = localStorage.getItem("language") || "th";

// ฟังก์ชันสลับภาษา
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem("language", lang);
    updateLanguage();
}

// ฟังก์ชันอัปเดตข้อความตาม Attribute [data-lang]
function updateLanguage() {
    document.querySelectorAll("[data-lang]").forEach(element => {
        let key = element.dataset.lang;
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });

    // อัปเดต Active State ของปุ่มเปลี่ยนภาษา
    document.querySelectorAll(".lang-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(`btn-lang-${currentLanguage}`);
    if (activeBtn) activeBtn.classList.add("active");
}

// อัปเดตทันทีเมื่อโหลดหน้าเว็บ
document.addEventListener("DOMContentLoaded", () => {
    updateLanguage();
});