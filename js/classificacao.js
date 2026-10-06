const listaClassificacao = document.getElementById("lista-classificacao");

function contarVitoriasDe(nome, listaVitorias) {
    const totalVitorias = listaVitorias.reduce((total, v) => {
        return v.nome === nome ? total + 1 : total;
    }, 0);
    return totalVitorias;
}

function criarClassificacao(vitorias) {
    const nomes = vitorias.map((v) => v.nome);
    const nomesUnico = [...new Set(nomes)];
    const classificacao = nomesUnico.map((nome) => {
        return {nome: nome, vitorias: contarVitoriasDe(nome, vitorias)};
    });
    return classificacao.sort((a, b) => b.vitorias - a.vitorias);
}

export function desenharClassificacao(vitorias) {
    if (vitorias.length === 0) {
        return listaClassificacao.innerHTML = 
        "<li>Ainda não há lista de vencedores</li>";
    }
    const vitoriaClassificacao= criarClassificacao(vitorias);
    listaClassificacao.innerHTML = vitoriaClassificacao.map((v) => 
        `<li>${v.nome}: ${v.vitorias}</li>`).join("");
}
