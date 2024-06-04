import { interacoesApi } from "../services/api/api.js"; 
import { setTempoVida, setEnergia, setEnergiaDois } from "./comuns.js"; 

export const interacao = (personagem, personagem2, relacao) => {
  const energia = relacao.energia;
  const pontos = relacao.pontos;
  const tempo = energia * 2000;

  const novaEnergia = setEnergia(personagem, energia);
  const novaEnergia2 = setEnergiaDois(personagem, energia / 2);

  if (novaEnergia <= 0 || novaEnergia2 <= 0)
    return [personagem, personagem2];

  const novoPersonagem = {
    ...personagem,
    tempo: setTempoVida(personagem, tempo),
    energia: novaEnergia,
    relacionamento: mapaDasRelacoes(personagem, personagem2.id, pontos),
  };

  const novoPersonagem2 = {
    ...personagem2,
    tempo: setTempoVida(personagem2, tempo),
    energia: novaEnergia2,
    relacionamento: mapaDasRelacoes(personagem2, personagem.id, pontos),
  };

  return [novoPersonagem, novoPersonagem2];
};

export const listaDeInteracoes = async (level) => {
  const list = await interacoesApi();

  const interacoes = {
      INIMIZADE: [...list.INIMIZADE, ...list.NEUTRO],
      NEUTRO: [...list.NEUTRO],
      AMIZADE: [...list.AMIZADE, ...list.NEUTRO],
      DEFAULT: [...list.AMOR, ...list.AMIZADE, ...list.NEUTRO]
  };

  return interacoes[level] || interacoes.DEFAULT;
};



export const getLevelInteracoes = (pontos) => {
  if (pontos < 0) return "INIMIZADE";
  else if (pontos < 10) return "NEUTRO";
  else if (pontos < 25) return "AMIZADE";
  return "AMOR";
};

const mapaDasRelacoes = (personagem, personagem2ID, pontos) => {
  const list = personagem.relacionamento;
  return list.map((relacao) => {
    if (relacao.id == personagem2ID) {
      const level = relacao.level + pontos;
      return { ...relacao, level };
    }
    return { ...relacao };
  });
};