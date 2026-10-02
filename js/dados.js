export async function carregarDados() {
    try {
        const resposta = await fetch("./data/dados.json");
        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status}`);
        }
        const dados = await resposta.json();
        return dados;
    } catch (erro) {
        console.error("Algo correu mal:", erro);
        return null;
    }
}