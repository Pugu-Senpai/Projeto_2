const listaJogadores = document.getElementById("lista-jogadores");

function criarBlocoJogador(numero, motas) {
    //Nome
    const idInput = `nome-jogador-${numero}`;
    const idSelect = `mota-jogador-${numero}`;
    const fieldSet = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = `Jogador ${numero}`;
    const labelNome = document.createElement("label");
    labelNome.textContent = "Nome";
    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.id = idInput;
    inputNome.name = idInput;
    labelNome.htmlFor = idInput;

    //MOTA
    const select = document.createElement("select");
    motas.forEach((mota) => {
        const opcao = document.createElement("option");
        opcao.value = mota.numero;
        opcao.textContent = mota.nome;
        opcao.selected = mota.numero === numero;
        select.append(opcao);     
    });
    const labelMota = document.createElement("label");
    labelMota.textContent = "Mota";
    select.id = idSelect;
    select.name = idSelect;
    labelMota.htmlFor = idSelect; 
    
    //Montar Bloco
    fieldSet.append(legend, labelNome, inputNome, labelMota, select);
    listaJogadores.append(fieldSet);
}

export function criarListaJogadores(total, motas) {
    listaJogadores.replaceChildren();
    for (let i = 1; i <= total; i++){
        criarBlocoJogador(i, motas);
    }
}

export function lerJogadores() {
    const jogadores = [];
    const totalBlocos = listaJogadores.children.length;
    for (let i = 1; i <= totalBlocos; i++) {
        const input = document.getElementById(`nome-jogador-${i}`);
        const select = document.getElementById(`mota-jogador-${i}`);
        const jogador = {numero: i, nome: input.value.trim(), mota: Number(select.value)};
        jogadores.push(jogador);
    }
    return jogadores;
}

export function validarJogadores(jogadores) {
    const jogadoresSemNome = jogadores.filter((j) => j.nome === "" );
    if (jogadoresSemNome.length > 0) {
        const numJogadores = jogadoresSemNome.map((j) => j.numero);
        return `Falta o nome dos jogadores: ${numJogadores.join(", ")}`;
    }
    const nomeJogadores = jogadores.map((j) => j.nome.toLowerCase());
    const semNomesRepetidos = new Set(nomeJogadores);
    if (semNomesRepetidos.size < nomeJogadores.length) {
        return "Há Jogadores com o mesmo nome";
    }
    const motasJogadores = jogadores.map((j) => j.mota);
    const semMotasRepetidas = new Set(motasJogadores);
    if (semMotasRepetidas.size < motasJogadores.length) {
        return "Há jogadores com a mesma mota";
    }
    return "";
}