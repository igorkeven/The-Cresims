export const setTempoVida = (personagem, perdaTempo) => {
    return (personagem.tempo - perdaTempo) < 0 ? 0 : personagem.tempo - perdaTempo
}

export const setEnergia = (personagem, perdaEnergia) => {
    return (personagem.energia - perdaEnergia) < 0 ? 0 : personagem.energia - perdaEnergia
}

export const setEnergiaDois = (personagem, perdaEnergia) => {
    return (personagem.energia - perdaEnergia) < 2 ? 2 : personagem.energia - perdaEnergia
}

export const setHigiene = (personagem, perdaHigiene) => {
    return (personagem.higiene - perdaHigiene) < 0 ? 0 : personagem.higiene - perdaHigiene
}

export const clearBash = () => {
    console.log('\x1Bc');
    console.clear()
}