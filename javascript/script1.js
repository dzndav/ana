const noBtn = document.getElementById('no');
const buttonsBox = document.getElementById('buttonsBox');
const counterEl = document.getElementById('counter');
let escapes = 0;

const excuses = [
    "Quase! 😏",
    "eu madondo em vc sim kkk",
    "Tenta de novo... ou não 😌",
    "Foge foge 🏃",
    "ainda ta insistindo 😂",
    "vc e teimosa em ana clara",
    "aceita logo q eu mando em voce kkk",
    "Só falta você aceitar mesmo 💗"
];

function dodge() {
    escapes++;
    counterEl.textContent = excuses[Math.min(escapes - 1, excuses.length - 1)] + "  (tentativa " + escapes + ")";

    const btnRect = noBtn.getBoundingClientRect();
    const margin = 12;
    const maxX = window.innerWidth - btnRect.width - margin;
    const maxY = window.innerHeight - btnRect.height - margin;

    // switch to fixed random positioning after first dodge
    noBtn.classList.remove('no-static');
    noBtn.style.position = 'fixed';

    let newX = Math.random() * (maxX - margin) + margin;
    let newY = Math.random() * (maxY - margin) + margin;

    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';

    // shrink slightly each time it's really persistent, but never disappear
    const scale = Math.max(0.72, 1 - escapes * 0.02);
    noBtn.style.transform = 'scale(' + scale + ')';
}
