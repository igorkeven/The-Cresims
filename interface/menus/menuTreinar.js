import { useQuestion } from "../../src/services/question/use-question.js";
import { cicloTreinoProdutoComprado } from "../../src/requisitos/aspiracoes.js";
import { itensHabilidadesApi } from "../../src/services/api/api.js";

const TEMPO = 5000;

export const menuTreinar = async (personagem) => {
   
  if (personagem.itens.length == 0) {
    setTimeout(function() {
        console.log("Não há ferramenta para realizar o treinamento");
    },5000);
    return personagem;
  }

  if (personagem.energia <= 6) {
    console.log("Energia insuficiente para treinamento")
    return personagem;
  }

  const escolha = await escolherItens(personagem.itens);
  const resposta = await itensHabilidadesApi();
  const itemEscolhido = pegarItem(resposta, escolha);


  return cicloTreinoProdutoComprado(
    personagem,
    itemEscolhido,
    itemEscolhido.nomeHabilidade
  );
};

export const escolherItens = async (itens) => {
  printItens(itens);

  const input = await useQuestion("\nEscolha uma ferramenta para treinar: ");
  return itens[input - 1];
};

export const printItens = async (itens) => {
  itens.forEach((item, index) => console.log(`${index + 1} - ${item}`));
};

export const pegarItem = (resposta, itemEscolhido) => {
  let escolha = {};

  Object.keys(resposta).forEach((key) => {
    resposta[key].forEach((item) => {
      if (item.nome === itemEscolhido) {
        escolha = { ...item };
        escolha.nomeHabilidade = key;
      }
    });
  });

  return escolha;
};

 const printAnimateTranning = (personagem, nomeHabilidade) => {
  switch (nomeHabilidade) {
    case "GASTRONOMIA":
     
      break;
    case "PINTURA":
      break;
    case "JOGOS":
      break;
    case "JARDINAGEM":
      break;
    case "MUSICA":
      break;
  }
};
