let pagina = 0;

const livro = document.getElementById("livroImg");
const seta = document.getElementById("seta");
const btnRima = document.getElementById("btnRima");
const btnCartas = document.getElementById("btnCartas");

seta.addEventListener("click", function () {

    livro.classList.add("fade-out"); 

    setTimeout(() => {

        if (pagina === 0) {
            livro.src = "../assets/img/menu/minigame-cartas-descricao.png";
            seta.src = "../assets/img/menu/seta-esquerda.png";
            seta.style.right = "auto";
            seta.style.left = "-40px";
            pagina = 1;

            btnRima.style.display = "none";
            btnCartas.style.display = "block";

        } else {
            livro.src = "../assets/img/menu/minigame-rima-descricao.png";
            seta.src = "../assets/img/menu/seta-direita.png";
            seta.style.left = "auto";
            seta.style.right = "-40px";
            pagina = 0;

            btnCartas.style.display = "none";
            btnRima.style.display = "block";
        }

        livro.classList.remove("fade-out");
        livro.classList.add("fade-in");

        setTimeout(() => livro.classList.remove("fade-in"), 150);

    }, 300);
});