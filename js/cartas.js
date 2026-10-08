export function tirarCarta(listaCartas) {
    const indice = Math.floor(Math.random() * listaCartas.length);
    return listaCartas[indice];
}