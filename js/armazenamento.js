const CHAVE = "mgc60-vitorias";

export function lerVitorias() {
    const vitoria = localStorage.getItem(CHAVE);
    if (!vitoria) {
        return [];
    }    
    return JSON.parse(vitoria);
}

export function guardarVitorias(vitoria) {
    const vitorias = lerVitorias();
    const novaVitorias = [...vitorias, vitoria];
    localStorage.setItem(CHAVE, JSON.stringify(novaVitorias));
}