const dialogs = document.querySelectorAll("dialog");

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