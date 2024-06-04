import { trabalhar, definirEmprego } from "../../src/requisitos/trabalhar.js";
import { empregosApi } from "../../src/services/api/api.js";
import { useQuestion } from "../../src/services/question/use-question.js";
import { animacaoTrabalhando } from "../animacoes/animacaoTrabalho.js";

export const menuTrabalho = async (personagem) => {
  let personagemTrabalho = await trabalhar(personagem);
  if (!personagemTrabalho.emprego) {
    console.log("Personagem sem emprego, adicionando emprego...");
    personagemTrabalho = await trabalhar(await adicionarEmprego(personagemTrabalho));
  }

  await animacaoTrabalhando(personagem, true);
  console.log("Personagem trabalho:", personagemTrabalho);
  return personagemTrabalho;
};

export const escolherEmprego = async (resposta) => {
  imprimirEmpregos(resposta);
  const escolha = await useQuestion("\nEscolha um cargo: ");
  return parseInt(escolha);
};

export const imprimirEmpregos = (empregos) => {
  empregos.forEach((emprego) => console.log(emprego.id + ". " + emprego.cargo));
};

export const adicionarEmprego = async (personagem) => {
  const resposta = await empregosApi();
  
  const escolha = await escolherEmprego(resposta);
  console.log("Escolha de emprego:", escolha);
  return { ...(await definirEmprego(personagem, resposta[escolha - 1])) };
};
