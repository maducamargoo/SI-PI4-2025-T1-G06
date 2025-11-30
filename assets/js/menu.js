const livroImg = document.getElementById("livroImg");
const btnRima = document.getElementById("btnRima");
const btnCartas = document.getElementById("btnCartas");
const seta = document.getElementById("seta");
let pagina = 0;

const paginas = [
    {
        img: "../assets/img/menu/minigame-rima-descricao.png",
        botao: "rima",
        seta: "direita"
    },
    {
        img: "../assets/img/menu/minigame-cartas-descricao.png",
        botao: "cartas",
        seta: "esquerda"
    }
];

function trocarPagina(indice) {
    livroImg.classList.add("fade-out");

    setTimeout(() => {
        livroImg.src = paginas[indice].img;

        if (paginas[indice].botao === "rima") {
            btnRima.style.display = "block";
            btnCartas.style.display = "none";
        } else {
            btnRima.style.display = "none";
            btnCartas.style.display = "block";
        }

        // Trocar seta
        if (paginas[indice].seta === "direita") {
            seta.src = "../assets/img/menu/seta-direita.png";
            seta.style.left = "auto";
            seta.style.right = "-40px";
        } else {
            seta.src = "../assets/img/menu/seta-esquerda.png";
            seta.style.left = "-40px";
            seta.style.right = "auto";
        }

        livroImg.classList.remove("fade-out");
        livroImg.classList.add("fade-in");

        setTimeout(() => livroImg.classList.remove("fade-in"), 200);

    }, 150);
}

seta.addEventListener("click", () => {
    pagina = pagina === 0 ? 1 : 0;
    trocarPagina(pagina);
});

btnRima.addEventListener("click", () => {
    window.location.href = "../../teacher/minigame1/minigame-rima-intro.html";
});

btnCartas.addEventListener("click", () => {
    window.location.href = "../pages/minigame-cartas.html";
});

trocarPagina(0);