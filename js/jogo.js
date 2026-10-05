let listaPilotos = [];
let turno = 0;

function criarPilotos(jogadores, motas) {
    const pilotos = jogadores.map((j) => {
        const mota = motas.find((m) => m.numero === j.mota);
        return {...j, posicao: 0, volta: 1, cor: mota.cor};
});
    return pilotos;
}

export function iniciarCorrida(jogadores, motas) {
    listaPilotos = criarPilotos(jogadores, motas);
    turno = 0;
}

export function obterPilotos() {
    return listaPilotos;
}