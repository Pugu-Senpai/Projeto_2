const pista = document.getElementById("pista");
const DESVIOS = [
    [-3, -2.5], [0, -2.5], [3, -2.5],
    [-3,  2.5], [0,  2.5], [3,  2.5]
];

function classeDaCasa(tipo) {
    switch (tipo) {
        case "META":
            return "casa-meta";
        
        case "C":
            return "casa-curva";
        
        case "E":
            return "casa-evento";
    
        default:
            return "casa-branco";
    }
}

export function desenharPista(casas) {
    pista.replaceChildren();
    casas.forEach((c) => {
        const divisao = document.createElement("div");
        divisao.classList.add("casa");
        divisao.classList.add(classeDaCasa(c.tipo));
        divisao.textContent = c.numero;
        divisao.style.left = `${c.x}%`;
        divisao.style.top = `${c.y}%`;
        pista.append(divisao);
    });
}

export function desenharPecas(pilotos, casas) {
    pista.querySelectorAll(".peca").forEach((el) => el.remove());
    pilotos.forEach((piloto, i) => {
        const casa = casas[piloto.posicao];
        const desvio = DESVIOS[i];
        const desvioX = desvio[0];
        const desvioY = desvio[1];
        const peca = document.createElement("div");
        peca.classList.add("peca");
        peca.textContent = `${piloto.numero}`;
        peca.style.backgroundColor = `${piloto.cor}`;
        peca.style.borderColor = `${piloto.placa}`;
        peca.style.color = `${piloto.corNumero}`;
        peca.style.left = `${casa.x + desvioX}%`;
        peca.style.top = `${casa.y + desvioY}%`;
        pista.append(peca);
    });
}