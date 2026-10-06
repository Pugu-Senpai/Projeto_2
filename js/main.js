import { trocarEcras } from "./ecras.js";
import { abrirJanela } from "./janelas.js";
import { criarListaJogadores, lerJogadores, validarJogadores } from "./configuracao.js";
import { carregarDados } from "./dados.js";
import { iniciarCorrida, obterPilotos, obterPilotoDaVez, passarTurno, avancarPilotoDaVez, TOTAL_VOLTAS, pilotoDaVezVenceu, obterEstado, restaurarCorrida } from "./jogo.js";
import { desenharPista, desenharPecas } from "./pista.js";
import { lancarDado, esperar } from "./utils.js";
import { desenharPosicoes } from "./painel.js";
import { lerVitorias, guardarVitorias, lerCorrida, guardarCorrida, apagarCorrida } from "./armazenamento.js";
import { desenharClassificacao } from "./classificacao.js";

const dados = await carregarDados();

const btnIniciar = document.getElementById("btn-iniciar-jogo");
const btnsJanela = document.querySelectorAll("[data-janela]");
const btnVoltar = document.getElementById("btn-voltar");
const radioJogadores = document.querySelectorAll('input[name="num-jogadores"]');
const paragrafoErro = document.getElementById("erro-formulario");
const formulario = document.getElementById("dados-jogador");
const btnDado = document.getElementById("btn-dado");
const numDado = document.getElementById("numero-dado");
const vezJogador = document.getElementById("vez-jogador");
const textoVolta = document.getElementById("volta");
const textoVitoria = document.getElementById("texto-vitoria");
const janelaVitoria = document.getElementById("vitoria");

function mostrarVez() {
    vezJogador.textContent = `Vez de: ${obterPilotoDaVez().nome}`;
}

function mostrarVolta() {
    textoVolta.textContent = `Volta ${obterPilotoDaVez().volta} de ${TOTAL_VOLTAS}`;
}

function mostrarCorrida() {
    btnDado.disabled = false;
    numDado.textContent = "";
    mostrarVez();
    mostrarVolta();
    desenharPista(dados.casas);
    desenharPecas(obterPilotos(), dados.casas);
    desenharPosicoes(obterPilotos(), dados.casas.length); 
    trocarEcras("ecra-jogo");   
}

btnIniciar.addEventListener("click", () => {
    trocarEcras("ecra-configuracao");
    const radioSelecionado = document.querySelector('input[name="num-jogadores"]:checked');
    criarListaJogadores(Number(radioSelecionado.value), dados.motas);
});

btnsJanela.forEach((b) => {
    b.addEventListener("click", () => {
        if (b.dataset.janela === "classificacao") {
            desenharClassificacao(lerVitorias());
        }
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
    guardarCorrida(obterEstado());
    mostrarCorrida();
});

btnDado.addEventListener("click", async () => {
    btnDado.disabled = true;
    const resultadoDado = lancarDado();
    numDado.textContent = resultadoDado;
    for (let i = 1; i <= resultadoDado; i++) {
        avancarPilotoDaVez(dados.casas.length);
        desenharPecas(obterPilotos(), dados.casas);
        if (pilotoDaVezVenceu()) {
            break;
        }
        await esperar(300);
    }   
    desenharPosicoes(obterPilotos(), dados.casas.length);
    if (pilotoDaVezVenceu()) {
        const vencedor = obterPilotoDaVez();        
        textoVitoria.textContent = vencedor.nome;
        const infoVitoria = {
            nome: vencedor.nome,
            mota: vencedor.mota,
            data: new Date().toLocaleDateString("pt-PT"),
        };
        guardarVitorias(infoVitoria);
        apagarCorrida();
        abrirJanela("vitoria");
        return;
    } 
    passarTurno();
    guardarCorrida(obterEstado());
    mostrarVez();
    mostrarVolta();
    btnDado.disabled = false;
});

janelaVitoria.addEventListener("close", () => {
    trocarEcras("ecra-inicial");
});

const corridaGuardada = lerCorrida();
if (corridaGuardada) {
    restaurarCorrida(corridaGuardada);
    mostrarCorrida();
}