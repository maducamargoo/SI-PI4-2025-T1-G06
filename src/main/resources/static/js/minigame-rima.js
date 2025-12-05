let rodadas = [];
let rodadaAtual = 0;
let tentativas = [];        
let pontosAcumulados = 0.0;   

const v1 = document.querySelectorAll('.verso-linha')[0];
const v2 = document.querySelectorAll('.verso-linha')[1];
const opcoesBtns = Array.from(document.querySelectorAll('.opcao'));
const tucanaImg = document.getElementById('tucana-img');
const balao = document.getElementById('balao');
const feedback = document.getElementById('feedback');
const feedbackImg = document.getElementById('feedback-img');
const feedbackText = document.getElementById('feedback-text');
const container = document.querySelector('.container');

const IMG_BASE = "/img/minigame-rima/";
const JSON_PATH = "/data/rimas.json";   

let soundCorrect = null, soundWrong = null, bgMusic = null;
try {
    soundCorrect = new Audio("/audio/certo.mp3");
    soundWrong = new Audio("/audio/errado.mp3");

} catch(e) {
    // sem áudio disponíveis — ok
}

function mostrarErroCarregamento(msg) {
    if (balao) balao.textContent = msg;
    console.error(msg);
}

fetch(JSON_PATH)
    .then(resp => {
        if (!resp.ok) throw new Error('Erro ao carregar JSON: ' + resp.status);
        return resp.json();
    })
    .then(data => {
        if (!data || !Array.isArray(data.rodadas) || data.rodadas.length === 0) {
            throw new Error('JSON válido, mas "rodadas" vazio ou ausente.');
        }
        rodadas = data.rodadas;
        tentativas = new Array(rodadas.length).fill(0);
        // if (bgMusic) bgMusic.play().catch(()=>{});
        carregarRodada();
    })
    .catch(err => {
        mostrarErroCarregamento("Erro carregando rimas. Abra via Live Server. " + err.message);
    });

function carregarRodada() {
    const r = rodadas[rodadaAtual];
    if (!r) {
        mostrarErroCarregamento("Rodada inválida: " + rodadaAtual);
        return;
    }

    v1.textContent = r.verso1 || "";
    v2.innerHTML = (r.verso2 || "").replace("_____", "<span class='faltando'>_____</span>");

    opcoesBtns.forEach((btn, i) => {
        btn.textContent = r.opcoes[i] || "";
        btn.disabled = false;
        btn.classList.remove('acertou','errou');
        btn.onclick = () => handleResposta(i);
    });

    feedback.classList.add('escondido');
    mudarExpressao('normal', 'Vamos cantar!');
}

function handleResposta(index) {
    const r = rodadas[rodadaAtual];
    if (!r) return;

    tentativas[rodadaAtual] = (tentativas[rodadaAtual] || 0) + 1;
    const tentativaAtual = tentativas[rodadaAtual];

    opcoesBtns.forEach(b => b.disabled = true);

    if (index === r.correta) {
        const pontosRodada = 1 / tentativaAtual;
        pontosAcumulados += pontosRodada;

        mostrarFeedback(true);
        mudarExpressao('cantando', 'A MÚSICA CONTINUA!');
        if (soundCorrect) { try { soundCorrect.currentTime = 0; soundCorrect.play(); } catch(e){} }

        opcoesBtns[index].classList.add('acertou');

        setTimeout(() => {
            rodadaAtual++;
            if (rodadaAtual < rodadas.length) {
                transicaoTrocaRodada(() => carregarRodada());
            } else {
                // 1. Prepara os dados
                const dadosParaSalvar = {
                    pontuacao: pontosAcumulados,
                    totalRodadas: rodadas.length
                };

                // 2. Envia para o Backend (Java)
                fetch('/api/games/rima/salvar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // Se usar Spring Security com CSRF, pode precisar do token aqui
                    },
                    body: JSON.stringify(dadosParaSalvar)
                })
                .then(response => {
                    if (response.ok) {
                        console.log("Salvo no banco!");
                    } else {
                        console.error("Erro ao salvar no banco");
                    }
                })
                .finally(() => {
                    // 3. Redireciona para a tela final (mesmo se der erro no save, o usuário vê o final)
                    // Mantemos o localStorage para exibir na tela final sem precisar consultar o banco de novo imediatamente
                    localStorage.setItem('pontos', pontosAcumulados.toFixed(2));
                    localStorage.setItem('totalRodadas', String(rodadas.length));
                    
                    window.location.href = "/final-rima";
                });
            }
        }, 900);

    } else {
        mostrarFeedback(false);
        mudarExpressao('vergonha', 'Ops! Não rimou!');
        if (soundWrong) { try { soundWrong.currentTime = 0; soundWrong.play(); } catch(e){} }
        opcoesBtns[index].classList.add('errou');

        setTimeout(() => {
            opcoesBtns.forEach(b => b.disabled = false);
        }, 700);
    }
}

function mostrarFeedback(acertou) {
    feedback.classList.remove('escondido');
    if (acertou) {
        feedbackImg.src = IMG_BASE + 'certo.png';
        feedbackText.textContent = 'A MÚSICA CONTINUA!';
    } else {
        feedbackImg.src = IMG_BASE + 'errado.png';
        feedbackText.textContent = 'OPS! NÃO RIMOU!';
    }
}

function mudarExpressao(tipo, texto) {
    const map = {
        normal: 'tucana.png',
        cantando: 'tucana-cantando.png',
        vergonha: 'tucana-vergonha.png',
        triste: 'tucana-triste.png',
        comemora: 'tucana-comemora.png',
        tensa: 'tucana-tensa.png'
    };
    const arquivo = map[tipo] || map.normal;
    tucanaImg.src = IMG_BASE + arquivo;
    if (balao) balao.textContent = texto || '';
}

function transicaoTrocaRodada(callback) {
    const alvo = document.querySelector('.verso-area') || container;
    if (!alvo) { callback(); return; }

    alvo.classList.add('fade-out');
    setTimeout(() => {
        alvo.classList.remove('fade-out');
        if (typeof callback === 'function') callback();
        alvo.classList.add('fade-in');
        setTimeout(() => alvo.classList.remove('fade-in'), 220);
    }, 220);
}
