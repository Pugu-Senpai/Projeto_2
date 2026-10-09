const dialogs = document.querySelectorAll("dialog");
const aviso = document.getElementById("aviso");
const avisoTitulo = document.getElementById("aviso-titulo");
const avisoImagem = document.getElementById("aviso-imagem");
const avisoTexto = document.getElementById("aviso-texto");

const TEMPO_AVISO = 3000;

export function abrirJanela(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.showModal();
    } else {
        console.warn(`O ID "${id}" não existe!`);
    } 
}

dialogs.forEach((d) => {
    d.addEventListener("click", (evento) => {
        if (evento.target === d) {
            d.close();  
        }     
    });
});

export function mostrarAviso(info) {
    avisoTitulo.textContent = info.nome;
    avisoTexto.textContent = info.descricao;
    avisoImagem.src = info.imagem;
    aviso.showModal();
    return new Promise((resolve) => {
        const temporizador = setTimeout(() => aviso.close(), TEMPO_AVISO);
        aviso.addEventListener("close", () => {
            clearTimeout(temporizador);
            resolve();
        }, {once: true});
    });
}