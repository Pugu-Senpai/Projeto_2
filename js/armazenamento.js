const CHAVE_VITORIA = "mgc60-vitorias";
const CHAVE_CORRIDA = "mgc60-corrida";

export function lerVitorias() {
    const vitoria = localStorage.getItem(CHAVE_VITORIA);
    if (!vitoria) {
        return [];
    }    
    return JSON.parse(vitoria);
}

export function guardarVitorias(vitoria) {
    const vitorias = lerVitorias();
    const novaVitorias = [...vitorias, vitoria];
    localStorage.setItem(CHAVE_VITORIA, JSON.stringify(novaVitorias));
}

export function lerCorrida() {
    const corrida = sessionStorage.getItem(CHAVE_CORRIDA);
    if (!corrida) {
        return null;
    }
    return JSON.parse(corrida);
}

export function guardarCorrida(estado) {
    sessionStorage.setItem(CHAVE_CORRIDA, JSON.stringify(estado));
}

export function apagarCorrida() {
    sessionStorage.removeItem(CHAVE_CORRIDA);
}

export function apagarVitorias() {
    localStorage.removeItem(CHAVE_VITORIA);
}