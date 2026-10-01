const listaJogadores = document.getElementById("lista-jogadores");

function criarBlocoJogador(numero) {
    const idInput = `nome-jogador-${numero}`;
    const fieldSet = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `Jogador ${numero}`;
    const label = document.createElement("label");
    label.textContent = "Nome";
    const input = document.createElement("input");
    input.type = "text";
    input.id = idInput;
    input.name = idInput;
    label.htmlFor = idInput;
    fieldSet.append(legend, label, input);
    listaJogadores.append(fieldSet);
}

export function criarListaJogadores(total) {
    listaJogadores.replaceChildren();
    for (let i = 1; i <= total; i++){
        criarBlocoJogador(i);
    }
}