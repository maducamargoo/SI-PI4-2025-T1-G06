let pontos = parseFloat(localStorage.getItem("pontos"));
let total = parseInt(localStorage.getItem("totalRodadas"), 10);

if (!isFinite(pontos)) pontos = 0;
if (!isFinite(total) || total < 0) total = 0;

const pontosFinaisEl = document.getElementById("pontos-finais");
const totalRodadasEl = document.getElementById("total-rodadas");
const titulo = document.getElementById("titulo-final");
const mensagem = document.getElementById("mensagem-final");
const tucanaFinalImg = document.getElementById("tucana-final-img");

pontosFinaisEl.textContent = pontos.toFixed(2);
totalRodadasEl.textContent = total;

const desempenho = (total === 0) ? 0 : (pontos / total);

if (total > 0 && desempenho >= 0.7) {
    tucanaFinalImg.src = "../../assets/img/minigame-rima/tucana-comemora.png";
    titulo.textContent = "Show incrível!";
    mensagem.textContent = "A plateia foi ao delírio! Você arrasou nas rimas! 🎤✨";
} else if (total > 0) {
    tucanaFinalImg.src = "../../assets/img/minigame-rima/tucana-triste.png";
    titulo.textContent = "Ah não...";
    mensagem.textContent = "A música parou 😢 Mas você pode tentar de novo!";
} else {
    tucanaFinalImg.src = "../../assets/img/minigame-rima/tucana-tensa.png";
    titulo.textContent = "Sem dados";
    mensagem.textContent = "Parece que não há resultados para mostrar.";
}

const btnRepetir = document.getElementById("btn-repetir");
const btnVoltar = document.getElementById("btn-voltar");

if (btnRepetir) {
    btnRepetir.addEventListener("click", () => {
        localStorage.removeItem("pontos");
        localStorage.removeItem("totalRodadas");
        window.location.href = "minigame-rima.html";
    });
}

if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        window.location.href = "../../teacher/menu.html";
    });
}
