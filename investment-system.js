let finance = {
    cash: 5000,
    saving: 0,
    investment: 0,
    financialScore: 0
};

// ฝากเงินเข้าบัญชีออมทรัพย์
function depositMoney(amount) {
    if (finance.cash >= amount) {
        finance.cash -= amount;
        finance.saving += amount;
        finance.financialScore += 5;
        
        // ซิงก์ค่ากับวัตถุ player (ถ้ามี)
        if (typeof player !== "undefined") player.money = finance.cash;
        
        alert(`🏦 ฝากเงินเรียบร้อย! ฝากเงิน: +${amount.toLocaleString()} บาท`);
        updateFinanceUI();
    } else {
        alert("❌ เงินสดไม่เพียงพอสำหรับการฝากเงิน!");
    }
}

// เลือกลงทุนประเภทต่างๆ
function invest(type) {
    let result;
    switch (type) {
        case "course":
            result = {
                name: "📚 ซื้อคอร์สเรียน",
                cost: 2000,
                type: "course"
            };
            break;
        case "business":
            result = {
                name: "🏢 ลงทุนธุรกิจ Startup",
                cost: 5000,
                type: "business"
            };
            break;
        case "stock":
            result = {
                name: "📈 ลงทุนในตลาดหุ้น",
                cost: 3000,
                type: "stock"
            };
            break;
    }

    if (finance.cash >= result.cost) {
        finance.cash -= result.cost;
        if (typeof player !== "undefined") player.money = finance.cash;
        investmentResult(result);
    } else {
        alert(`❌ เงินสดไม่พอ! การลงทุน ${result.name} ต้องใช้เงิน ${result.cost.toLocaleString()} บาท`);
    }
}

// สุ่มผลลัพธ์การลงทุน (โอกาสสำเร็จ 60%)
function investmentResult(result) {
    let success = Math.random() > 0.4;
    
    if (success) {
        let returnProfit = result.cost * 2;
        finance.investment += returnProfit;
        finance.financialScore += 15;
        
        // ถ้าเป็นคอร์สเรียน ให้บวกสกิลด้วย
        if (result.type === "course" && typeof addSkill === "function") {
            addSkill("coding", 15);
        }
        
        alert(`🎉 ลงทุนสำเร็จ!\n${result.name}\nคุณได้รับผลตอบแทนมูลค่า ${returnProfit.toLocaleString()} บาท (คะแนนการเงิน +15)`);
    } else {
        alert(`📉 การลงทุนมีความเสี่ยง...\n${result.name} ไม่เป็นไปตามคาด สูญเสียเงินลงทุน ${result.cost.toLocaleString()} บาท`);
    }
    
    updateFinanceUI();
}

// อัปเดต UI ส่วน Finance
function updateFinanceUI() {
    if (document.getElementById("cash")) document.getElementById("cash").innerText = finance.cash.toLocaleString();
    if (document.getElementById("saving")) document.getElementById("saving").innerText = finance.saving.toLocaleString();
    if (document.getElementById("investment")) document.getElementById("investment").innerText = finance.investment.toLocaleString();
    if (document.getElementById("financialScore")) document.getElementById("financialScore").innerText = finance.financialScore;
}