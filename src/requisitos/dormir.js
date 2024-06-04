const TEMPO_POR_CICLO = 5000; // 5 segundos por ciclo
const ENERGIA_POR_CICLO = 4; // Energia recuperada por ciclo
const ENERGIA_TOTAL = 32; // Energia total necessária

const calcularEnergiaRecuperada = (ciclos) => {
  let energiaRecuperada = 0;
  let bonus = 0;

  for (let i = 0; i < ciclos; i++) {
    energiaRecuperada += ENERGIA_POR_CICLO + bonus;
    bonus += 2;
  }

  return energiaRecuperada;
};

export const calcularTempoNecessarioParaEnergiaTotal = async (personagem) => {
  const energiaFaltante = ENERGIA_TOTAL - personagem.energia;
  let ciclosNecessarios = 0;

  while (calcularEnergiaRecuperada(ciclosNecessarios) < energiaFaltante) {
    ciclosNecessarios++;
  }

  return ciclosNecessarios * TEMPO_POR_CICLO;
};

export const acaoDormir = async (personagem, tempoDeSono) => {
  const ciclosDeSono = Math.floor(tempoDeSono / (TEMPO_POR_CICLO / 1000));
  const energiaRecuperada = calcularEnergiaRecuperada(ciclosDeSono);

  personagem.energia = Math.min(ENERGIA_TOTAL, personagem.energia + energiaRecuperada);
};
