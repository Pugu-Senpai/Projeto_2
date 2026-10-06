const listaPosicoes = document.getElementById("lista-posicoes");

function calcularProgresso(piloto, totalCasas) {
    return (piloto.volta - 1) * totalCasas + piloto.posicao;
}

function ordenarPorProgresso(pilotos, totalCasas) {
    return [...pilotos].sort((a, b) => calcularProgresso(b, totalCasas) - calcularProgresso(a, totalCasas));
}

export function desenharPosicoes(pilotos, totalCasas) {
    const porProgresso = ordenarPorProgresso(pilotos, totalCasas);
    listaPosicoes.innerHTML = porProgresso.map((p) => `<li>${p.nome}: ${p.volta}</li>`).join("");
}