import { comprarItens } from "../../src/requisitos/aspiracoes.js"; 
import { itensHabilidadesApi } from "../../src/services/api/api.js"; 
import { menuHabilidades } from "./menuHabilidades.js"; 
import { useQuestion } from "../../src/services/question/use-question.js"; 
import { theCresimsLogo } from "./theCresimsLogo.js";

export const menuDeCompraItens = async (personagem) => {
  const TEMPO = 5000;
  const response = await itensHabilidadesApi();
  const escolhaItem = await escolhaDoItem();

  if (escolhaItem.toUpperCase() === "X") return personagem;

  const produto = await escolhaProduto(response, escolhaItem);
  const compraPersonagem = comprarItens(personagem, produto, escolhaItem.toUpperCase());

  if (!compraPersonagem) {

    return personagem;
  }

  return compraPersonagem;
};

export const escolhaProduto = async (response, escolhaHabilidade) => {
  const listaDeItensHabilidades = response[escolhaHabilidade.toUpperCase()];

  console.log(`${await theCresimsLogo()}`);

  listaDeItensHabilidades.forEach((produto) =>
    console.log(`${produto.id}. ${produto.nome}  $${produto.preco}`)
  );

  console.log("X. Voltar ao menu principal \n");

  const escolha = await useQuestion(`
  Escolha uma produto`);
  return listaDeItensHabilidades[escolha - 1];
};

export const escolhaDoItem = async () => {
  //await animationBuyItens();
  const escolhaAspiracao = menuHabilidades(`Escolha um setor da loja: `);

  return escolhaAspiracao;
};
