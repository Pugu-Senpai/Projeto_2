import { trocarEcras } from "./ecras.js";
import { abrirJanela } from "./janelas.js";
import { criarListaJogadores } from "./configuracao.js";

const btnIniciar = document.getElementById("btn-iniciar-jogo");
btnIniciar.addEventListener("click", () => {
    trocarEcras("ecra-configuracao");
    const radioSelecionado = document.querySelector('input[name="num-jogadores"]:checked');
    criarListaJogadores(Number(radioSelecionado.value));
});

const btnsJanela = document.querySelectorAll("[data-janela]");
btnsJanela.forEach((b) => {
    b.addEventListener("click", () => {
        abrirJanela(b.dataset.janela);
    });
});

const btnVoltar = document.getElementById("btn-voltar");
btnVoltar.addEventListener("click", () => {
    trocarEcras("ecra-inicial");
});

const radioJogadores = document.querySelectorAll('input[name="num-jogadores"]');
radioJogadores.forEach((n) => {
    n.addEventListener("change", () => {
        criarListaJogadores(Number(n.value));
    });
});