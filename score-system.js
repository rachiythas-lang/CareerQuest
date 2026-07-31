// คำนวณคะแนนคุณภาพชีวิต (เต็ม 20 คะแนน)
function calculateLifeScore() {
    if (typeof life === "undefined") return 0;
    let score = 0;
    score += life.health * 0.1;
    score += (100 - life.stress) * 0.05;
    score += life.happiness * 0.05;
    return Math.floor(score);
}

// คำนวณคะแนนการเงิน (เต็ม 30 คะแนน)
function calculateFinanceScore() {
    if (typeof finance === "undefined") return 0;
    let totalAssets = finance.saving + finance.investment;
    let assetScore = Math.floor(totalAssets / 5000);
    let totalFinanceScore = assetScore + Math.floor(finance.financialScore / 5);
    return Math.min(30, totalFinanceScore);
}

// คำนวณคะแนนรวมทั้งหมด (100 คะแนน)
function calculateFinalScore() {
    let careerScore = (typeof careerLevel !== "undefined") ? Math.min(careerLevel * 10, 40) : 10; // สูงสุด 40
    let financeScore = calculateFinanceScore(); // สูงสุด 30
    let lifeScore = calculateLifeScore();       // สูงสุด 20
    let skillScore = 10;                        // สูงสุด 10

    let total = careerScore + financeScore + lifeScore + skillScore;
    return Math.min(total, 100);
}