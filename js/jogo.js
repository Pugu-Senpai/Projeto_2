let listaPilotos = [];
let turno = 0;
export const TOTAL_VOLTAS = 1;

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

export function obterPilotoDaVez() {
    return listaPilotos[turno];
}

export function passarTurno() {
    turno = (turno + 1) % listaPilotos.length;
}

export function avancarPilotoDaVez(totalCasas) {
    listaPilotos = listaPilotos.map((p, i) => {
        if (i !== turno) {
            return p;
        }
        const novaPosicao = (p.posicao + 1) % totalCasas;
        const novaVolta = novaPosicao === 0 ? p.volta + 1 : p.volta;
        return {...p, posicao: novaPosicao, volta: novaVolta};
    });
}

export function pilotoDaVezVenceu() {
    return obterPilotoDaVez().volta > TOTAL_VOLTAS;
}