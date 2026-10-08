import { trocarEcras } from "./ecras.js";
import { abrirJanela } from "./janelas.js";
import { criarListaJogadores, lerJogadores, validarJogadores } from "./configuracao.js";
import { carregarDados } from "./dados.js";
import { iniciarCorrida, obterPilotos, obterPilotoDaVez, passarTurno, 
    avancarPilotoDaVez, TOTAL_VOLTAS, pilotoDaVezVenceu, obterEstado, 
    restaurarCorrida, recuarPilotoDaVez } from "./jogo.js";
import { desenharPista, desenharPecas } from "./pista.js";
import { lancarDado, esperar } from "./utils.js";
import { desenharPosicoes } from "./painel.js";
import { lerVitorias, guardarVitorias, lerCorrida, guardarCorrida, 
    apagarCorrida, apagarVitorias } from "./armazenamento.js";
import { desenharClassificacao } from "./classificacao.js";
import { tirarCarta } from "./cartas.js";

const dados = await carregarDados();
const CASA_DESPISTE = 2;
const RECUAR = 1;
const PAUSA_MOVIMENTO = 300;
const PAUSA_LEITURA = 1500;
const PAUSA_DADO = 900;

const btnIniciar = document.getElementById("btn-iniciar-jogo");
const btnsJanela = document.querySelectorAll("[data-janela]");
const btnVoltar = document.getElementById("btn-voltar");
const btnDado = document.getElementById("btn-dado");
const btnSair = document.getElementById("btn-sair");
const btnLimparClassificacao = document.getElementById("btn-limpar-classificacao");

const radioJogadores = document.querySelectorAll('input[name="num-jogadores"]');
const paragrafoErro = document.getElementById("erro-formulario");
const formulario = document.getElementById("dados-jogador");
const numDado = document.getElementById("numero-dado");
const vezJogador = document.getElementById("vez-jogador");
const textoVolta = document.getElementById("volta");
const textoVitoria = document.getElementById("texto-vitoria");
const janelaVitoria = document.getElementById("vitoria");
const janelaOpçoes = document.getElementById("opcoes");
const mensagem = document.getElementById("mensagem");
const mensagemOpcoes = document.getElementById("mensagem-opcoes");


function mostrarVez() {
    vezJogador.textContent = `Vez de: ${obterPilotoDaVez().nome}`;
}

function mostrarMensagem(texto) {
    mensagem.textContent = texto;
}

function mostrarVolta() {
    textoVolta.textContent = `Volta ${obterPilotoDaVez().volta} de ${TOTAL_VOLTAS}`;
}

function mostrarCorrida() {
    btnDado.disabled = false;
    btnSair.disabled = false;
    numDado.textContent = "";
    mostrarVez();
    mostrarVolta();
    desenharPista(dados.casas);
    desenharPecas(obterPilotos(), dados.casas);
    desenharPosicoes(obterPilotos(), dados.casas.length); 
    mostrarMensagem("");
    trocarEcras("ecra-jogo");   
}

function casaAtual() {
    const piloto = obterPilotoDaVez();
    return dados.casas[piloto.posicao];
}

async function recuarCasas(casas) {
    for (let i = 0; i < casas; i++) {
        recuarPilotoDaVez(RECUAR);
        desenharPecas(obterPilotos(), dados.casas);
        await esperar(PAUSA_MOVIMENTO);        
    }
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
    btnSair.disabled = true;
    mostrarMensagem("");
    const resultadoDado = lancarDado();
    let curvaPerfeita = false;
    numDado.textContent = resultadoDado;
    await esperar(PAUSA_DADO);
    for (let i = 1; i <= resultadoDado; i++) {
        avancarPilotoDaVez(dados.casas.length);
        desenharPecas(obterPilotos(), dados.casas);
        if (pilotoDaVezVenceu()) {
            break;
        }
        //CURVA EVENTO
        if (casaAtual().tipo === "C" && !curvaPerfeita) {
            const dadoCurva = lancarDado();
            //DESPISTE
            if (dadoCurva === 1) {
                mostrarMensagem(`${obterPilotoDaVez().nome} teve um DESPISTE!`);
                await esperar(PAUSA_LEITURA)
                await recuarCasas(CASA_DESPISTE);
                break;
            //SUCESSO
            } else if (dadoCurva === 6) {
                mostrarMensagem(`${obterPilotoDaVez().nome} fez CURVA PERFEITA!`); 
                curvaPerfeita = true; 
            } else {
                mostrarMensagem(`${obterPilotoDaVez().nome} fez a CURVA!`);
                await esperar(PAUSA_DADO);
            }
        }
        await esperar(PAUSA_MOVIMENTO);
    }
    //CASA EVENTO
    if (casaAtual().tipo === "E") {
        const carta = tirarCarta(dados.eventos);
        mostrarMensagem(`${carta.nome} | ${carta.descricao}`);
        await esperar(PAUSA_LEITURA);
        if (carta.casas > 0) {
            for (let i = 0; i < carta.casas; i++) {
                avancarPilotoDaVez(dados.casas.length);
                desenharPecas(obterPilotos(), dados.casas);
                if (pilotoDaVezVenceu()) {
                    break;
                }
                await esperar(PAUSA_MOVIMENTO);
            }    
        } else {
            await recuarCasas(Math.abs(carta.casas));
        }
    }  
    desenharPosicoes(obterPilotos(), dados.casas.length);

    //VENCEER CORRIDA
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
    btnSair.disabled = false;
});

janelaVitoria.addEventListener("close", () => {
    trocarEcras("ecra-inicial");
});

btnSair.addEventListener("click", () => {
    if (confirm("Queres sair da corrida?")) {
        apagarCorrida();
        trocarEcras("ecra-inicial");
    }
});

btnLimparClassificacao.addEventListener("click", () => {
    if (confirm("Pretende eliminar a classificação existente?")) {
        apagarVitorias()
        mensagemOpcoes.textContent = "Lista classificações eliminada!"
    }
});

janelaOpçoes.addEventListener("close", () => {
    mensagemOpcoes.textContent = "";
});

const corridaGuardada = lerCorrida();
if (corridaGuardada) {
    restaurarCorrida(corridaGuardada);
    mostrarCorrida();
}