// ให้โบนัส Skill ตั้งต้นตามอาชีพที่เลือก
function applyCareerBonus() {
    if (typeof player === "undefined" || !player.career) return;

    if (player.career === "Programmer") {
        addSkill("coding", 15);
    } else if (player.career === "Chef") {
        addSkill("communication", 10);
    } else if (player.career === "Teacher") {
        addSkill("communication", 15);
    } else if (player.career === "Farmer") {
        addSkill("saving", 15);
    }
    
    updateSkillUI();
}