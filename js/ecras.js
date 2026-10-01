const ecras = document.querySelectorAll(".ecra");

export function trocarEcras(id) {
    ecras.forEach((e) => {
        e.hidden = true;
    });

    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.hidden = false;
    } else {
        console.warn(`O ID "${id}" não existe!`);
    } 
};

