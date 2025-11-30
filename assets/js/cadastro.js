const numeroCartao = document.getElementById("numeroCartao");
numeroCartao.addEventListener("input", () => {
    let v = numeroCartao.value.replace(/\D/g, "");
    v = v.replace(/(.{4})/g, "$1 ").trim();
    numeroCartao.value = v;
});

const validade = document.getElementById("validadeCartao");
validade.addEventListener("input", () => {
    let v = validade.value.replace(/\D/g, "");
    if (v.length >= 3) v = v.slice(0,2) + "/" + v.slice(2,4);
    validade.value = v.slice(0,5);
});

const usuario = document.getElementById("usuarioEscola");
usuario.addEventListener("input", () => {
    let v = usuario.value.toLowerCase();
    v = v.replace(/[^a-z0-9-_]/g, "");
    usuario.value = v;
});


const senha = document.getElementById("senhaEscola");
const confirma = document.getElementById("confirmaSenha");

senha.addEventListener("input", () => {
    senha.style.borderColor = senha.value.length >= 6 ? "#43a047" : "red";
});

confirma.addEventListener("input", () => {
    confirma.style.borderColor = senha.value === confirma.value ? "#43a047" : "red";
});


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    // valida usuário
    if (usuario.value.length < 5) {
        alert("O usuário deve ter no mínimo 5 caracteres.");
        usuario.focus();
        return;
    }

    // valida senha
    if (senha.value.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        senha.focus();
        return;
    }

    // confirmar senha
    if (senha.value !== confirma.value) {
        alert("As senhas não coincidem.");
        confirma.focus();
        return;
    }

    // validar validade MM/AA
    const val = validade.value;
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val)) {
        alert("A validade do cartão deve estar no formato MM/AA.");
        validade.focus();
        return;
    }

    // validar cartão (min 16 dígitos)
    const numeroLimpo = numeroCartao.value.replace(/\D/g, "");
    if (numeroLimpo.length < 16) {
        alert("Número do cartão inválido.");
        numeroCartao.focus();
        return;
    }

    // validar plano escolhido
    const plano = document.querySelector("input[name='plano']:checked");
    if (!plano) {
        alert("Selecione um plano para continuar.");
        return;
    }

    // Se chegou até aqui, está válido
    alert("Cadastro enviado com sucesso!");
});
