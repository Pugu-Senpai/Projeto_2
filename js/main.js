import { trocarEcras } from "./ecras.js";
import { abrirJanela } from "./janelas.js";
import { criarListaJogadores, lerJogadores, validarJogadores } from "./configuracao.js";
import { carregarDados } from "./dados.js";
import { iniciarCorrida, obterPilotos } from "./jogo.js";

const dados = await carregarDados();
console.log(dados);

const btnIniciar = document.getElementById("btn-iniciar-jogo");
const btnsJanela = document.querySelectorAll("[data-janela]");
const btnVoltar = document.getElementById("btn-voltar");
const radioJogadores = document.querySelectorAll('input[name="num-jogadores"]');
const paragrafoErro = document.getElementById("erro-formulario");
const formulario = document.getElementById("dados-jogador");


btnIniciar.addEventListener("click", () => {
    trocarEcras("ecra-configuracao");
    const radioSelecionado = document.querySelector('input[name="num-jogadores"]:checked');
    criarListaJogadores(Number(radioSelecionado.value), dados.motas);
});

btnsJanela.forEach((b) => {
    b.addEventListener("click", () => {
        abrirJanela(b.dataset.janela);
    });
});

btnVoltar.addEventListener("click", () => {
    trocarEcras("ecra-inicial");
});

radioJogadores.forEach((n) => {
    n.addEventListener("change", () => {
        criarListaJogadores(Number(n.value), dados.motas);
    });
});

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const jogadores = lerJogadores();
    const erro = validarJogadores(jogadores);
    paragrafoErro.textContent = erro;
    if (erro) {
        return;
    }
    iniciarCorrida(jogadores, dados.motas);
    console.log(obterPilotos());
    trocarEcras("ecra-jogo");
});