import { trocarEcras } from "./ecras.js";
import { abrirJanela } from "./janelas.js";

const btnIniciar = document.getElementById("btn-iniciar-jogo");

btnIniciar.addEventListener("click", () => {
    trocarEcras("ecra-configuracao");
});

const btnsJanela = document.querySelectorAll("[data-janela]");

btnsJanela.forEach((b) => {
    b.addEventListener("click", () => {
        abrirJanela(b.dataset.janela);
    });
});