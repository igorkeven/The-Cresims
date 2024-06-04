import {
  getPersonagem,
  atualizarPersonagens,
} from "../../src/services/crud/personagem.js";
import { useQuestion } from "../../src/services/question/use-question.js";
import { theCresimsLogo } from "./theCresimsLogo.js";
import { clearBash } from "../../src/requisitos/comuns.js";
import { getLevelInteracoes, interacao, listaDeInteracoes } from "../../src/requisitos/interacao.js";
import { mostrarPersonagens } from "../../src/services/crud/personagem.js";


const animacaoDaInteracao = async (personagem1, personagem2, display) => {
  if (display == true) {
    const emojis = ["( º ͜> º)", "( ͡° ͜O ͡°)", "( ͡ ͜ʖ ͡)", "( ° ͜o °)", "( X ͜ʖ X)"];
    
    function obterEmojiAleatorio() {
      const indiceAleatorio = Math.floor(Math.random() * emojis.length);
      return emojis[indiceAleatorio];
    }
    clearBash();

    console.log(`
${await theCresimsLogo()}

${personagem1.nome} ${obterEmojiAleatorio()}: Olá, ${personagem2.nome}! Como está indo o nosso projeto?


       
`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    

    console.log(`


${personagem2.nome} ${obterEmojiAleatorio()}: Oi, ${personagem1.nome}! Estou fazendo progresso na implementação do recurso X. E você?

      1 / 5
`);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearBash();

    console.log(`
${await theCresimsLogo()}

${personagem1.nome} ${obterEmojiAleatorio()}: Ótimo! Eu estava trabalhando na interface do usuário. Precisamos resolver aquele bug na página de login.


       
`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    

    console.log(`


${personagem2.nome} ${obterEmojiAleatorio()}: Ah, sim! Vou verificar isso agora mesmo. Enquanto isso, você pode revisar a documentação?

        2 / 5
`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearBash();

    console.log(`
${await theCresimsLogo()}

${personagem1.nome} ${obterEmojiAleatorio()}: Claro! Vou dar uma olhada. E, hey, obrigada por me ajudar com o CSS ontem!

       
`);
    await new Promise((resolve) => setTimeout(resolve, 500));

   

    console.log(`


${personagem2.nome} ${obterEmojiAleatorio()}: Sem problemas, Alice! Estamos nisso juntos.


        3 / 5
`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearBash();

    console.log(`
${await theCresimsLogo()}

 ${personagem1.nome} ${obterEmojiAleatorio()}: então ferrou.


      
`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    

    console.log(`
\n

${personagem2.nome} ${obterEmojiAleatorio()}: temos problemas, ${personagem1.nome}! Estamos no titanic juntos.

     
        4 / 5
`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearBash();

    console.log(`
${await theCresimsLogo()}

${personagem1.nome} ${obterEmojiAleatorio()}: To fôra!!.


       
`);
    await new Promise((resolve) => setTimeout(resolve, 500));
   

    console.log(`
\n

${personagem2.nome} ${obterEmojiAleatorio()}: até mais.


        5 / 5
`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

export const menuInteracao = async (personagem) => {
  let menuInteractionDisplay = true;
  while ((menuInteractionDisplay = true)) {
    clearBash();
   

    mostrarPersonagens().forEach(mensagem => console.log(mensagem));
    const escolha = await useQuestion('SUA ESCOLHA:');

    if (escolha == 'X' || escolha == 'x' || escolha == personagem.id) {
      return [personagem, false];
    }
    const personagemInteracao =  getPersonagem(  escolha);

    if (personagemInteracao == personagem) {
      return [personagem, false];
    }

    try {
      if (personagemInteracao.id != personagem.id) {
        const novoUsuario = criarRelacao(personagem, personagemInteracao);
        const segundoUsuario = criarRelacao(personagemInteracao, personagem);

        return await selecionarInteracao(novoUsuario, segundoUsuario);
      } else {
        console.log("Informe um id de personagem diferente do seu");
      }
    } catch {
      console.log("Informe um id valido");
    }
  }
};

const selecionarInteracao = async (personagem, personagem2) => {
  let selecionarInteracaoNaTela = true;
  while ((selecionarInteracaoNaTela = true)) {
    console.log(`
${await theCresimsLogo()}
Escolha uma das opções de interação abaixo:`);

    const pontos = pontosDeInteracao(personagem, personagem2.id);
    const level = getLevelInteracoes(pontos); // esse vem de interacao.js
    const lista = await listaDeInteracoes(level); // esse vem de interacao.js

    while (true) {
      await mostrarInteracoes(lista);
      const input = await useQuestion(`
Seu level de relacionamento 
com "${personagem2.nome}" é "${level}" com ${pontos} pontos

Id da interação escolhida: `);

      try {
        const objInteracao = lista[input - 1];

        const [novoPersonagem, novoPersonagem2] = await interacao( //isso vem de interacao.js
          personagem,
          personagem2,
          objInteracao
        );

        if (novoPersonagem.energy < 0 || novoPersonagem2.energy < 0) {
          clearBash();
          console.log(
            `
${await theCresimsLogo()}
Pontos de energia insuficiente para realizar a interação`
          );
          await useQuestion(`Pressione ENTER para continuar...`);
          return [personagem, false];
        }

        await atualizarPersonagens([novoPersonagem2]);

        clearBash();
        await animacaoDaInteracao(personagem, personagem2, true);
        clearBash();
        console.log(
          `
${await theCresimsLogo()}

              ${personagem2.nome}
     ,,,,     ,,,,
    (⚆_⚆      ⚆_⚆)  
     <|>       <|> 
      LL       ⅃⅃ 
     ${personagem.nome}  

Interação "${objInteracao.interacao}" realizada com sucesso
`
        );
        await useQuestion(`Pressione ENTER para continuar...`);
        return [novoPersonagem, true];
      } catch {
        console.log("Adicione um id de interação possivel");
      }
    }
  }
};

const criarRelacao = (personagem, personagem2) => {
  const relacao = getRelacao(personagem, personagem2.id);

  if (!relacao) {
    personagem.relacionamento.push({
      id: personagem2.id,
      nome: personagem2.nome,
      level: 0,
    });
  }

  return personagem;
};

const getRelacao = (personagem, personagemID) => {
  const listaRelacao = personagem.relacionamento;
  return listaRelacao.find((perso) => perso.id == personagemID);
};

const pontosDeInteracao = (personagem, personagemID) => {
  const relacao = getRelacao(personagem, personagemID);
  return relacao.level;
};

const mostrarInteracoes = async (list) => {
  let cont = 1;
  clearBash();
  console.log(`
${await theCresimsLogo()}

Escolha uma das Interações a seguir:
  `);

  for (const obj of list) {
    console.log(
      `${cont} - ${obj.interacao} (pontos: ${obj.pontos}, energia: ${obj.energia})`
    );
    cont++;
  }

  console.log("");
};
