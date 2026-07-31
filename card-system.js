function drawCard() {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    
    // เสียงหรือ Animation ป๊อบอัป สามารถเรียกใช้สไตล์สว่างไสวได้ที่นี่
    setTimeout(() => {
        alert(`🎴 การ์ดเหตุการณ์: ${randomCard.title}\n\n${randomCard.text}`);
        randomCard.effect();
    }, 300);
}