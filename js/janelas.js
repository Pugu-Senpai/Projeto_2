export function abrirJanela(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.showModal();
    } else {
        console.warn(`O ID "${id}" não existe!`);
    } 
}