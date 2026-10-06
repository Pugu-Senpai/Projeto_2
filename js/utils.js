export function lancarDado() {
    return Math.floor(Math.random() * 6) + 1;
}

export function esperar(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}