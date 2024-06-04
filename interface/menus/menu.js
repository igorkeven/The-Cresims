import { useQuestion } from "../../src/services/question/use-question.js";
import { theCresimsLogo, theCresimsLogoby } from "./theCresimsLogo.js";
import {setPersonagem, getPersonagem, getTodosPersonagens, deletarPersonagem, mostrarPersonagens, getPersonagemdead ,atualizarPersonagens ,validarEnergiaEHigiene,verificarCheat } from "../../src/services/crud/personagem.js";
import { clearBash } from "../../src/requisitos/comuns.js";
import {  getStorageDead , updateStorageDead } from "../../src/services/crud/storage.js"
 import { mortePersonagem } from "../animacoes/mortePersonagem.js"; 
import { menuHabilidades } from "./menuHabilidades.js";
import { infoDisplay } from "./infoDisplay.js";
import { menuTreinar } from "./menuTreinar.js";
import { menuInteracao } from "./menuInteracao.js";
import { menuDeCompraItens } from "./menuComprarItem.js";
import { menuTrabalho } from "./menuTrabalhar.js";
import { menuDormir } from "./menuDormir.js";
import { menuBanho } from "./menuTomarBanho.js";
import { executarCheat } from "../../src/requisitos/cheats.js";










export const startMenu = async () => {
  let mensagemAtencao = ``;
  let startMenu = true;
  const menucriarPersonagem = "\x1b[36m⭐ Criar Personagem\x1b[0m";
  const menuescolherPersonagem = "\x1b[32m👤 Escolher Personagem\x1b[0m";
  const menulistarPersonagens = "\x1b[33m📋 Listar Personagens\x1b[0m";
  const menudeletarPersonagem = "\x1b[34m🗑️  Deletar Personagem\x1b[0m";
  const menuvisitarCemiterio = "\x1b[35m🌟 Visitar Cemitério dos Personagens\x1b[0m";
  const menufinalizarJogo = "\x1b[31m❌ Finalizar jogo\x1b[0m";
  while (startMenu == true) {
    clearBash()
    const input = await useQuestion(`
    ░▒█▀▀▄░▒█▀▀▀░▒█▀▄▀█░░░▒█░░▒█░▀█▀░▒█▄░▒█░▒█▀▀▄░▒█▀▀▀█
    ░▒█▀▀▄░▒█▀▀▀░▒█▒█▒█░░░░▒█▒█░░▒█░░▒█▒█▒█░▒█░▒█░▒█░░▒█
    ░▒█▄▄█░▒█▄▄▄░▒█░░▒█░░░░░▀▄▀░░▄█▄░▒█░░▀█░▒█▄▄█░▒█▄▄▄█ 
${await theCresimsLogo()}
${await theCresimsLogoby()}
                                                                                          
Escolha uma das opções:
${mensagemAtencao}

1. ${menucriarPersonagem}

2. ${menuescolherPersonagem}

3. ${menulistarPersonagens}

4. ${menudeletarPersonagem}

5. ${menuvisitarCemiterio}

X. ${menufinalizarJogo}

Sua escolha: `);

    switch (input.toUpperCase()) {
      case "1":
        const nome =  await useQuestion("Nome do personagem?");
        const aspiracao = await menuHabilidades("Aspiração do personagem:");
        return setPersonagem(nome, aspiracao);
      case "2":
       
  clearBash()
        mostrarPersonagens().forEach(mensagem => console.log(mensagem));
        
        const escolha = await useQuestion('SUA ESCOLHA:');
        return getPersonagem(escolha);
      case "3":
        clearBash()
         getTodosPersonagens().forEach(mensagem => console.log(mensagem));
        await useQuestion(`
        Pressione ENTER para continuar...`);
        break;
      case "4":
        clearBash()
        getTodosPersonagens().forEach(mensagem => console.log(mensagem));
        const escolhaDelete =  await useQuestion(`Escolha o id do personagem que deseja deletar: `);
        
        if (escolhaDelete.toUpperCase() != "X") {
          deletarPersonagem(escolhaDelete);
        }
        break;
      case "5":
        clearBash()
      getTodosPersonagens(false).forEach(mensagem => console.log(mensagem));
        
      const escolhaPersonagemMorto = await useQuestion('SUA ESCOLHA:');
      return getPersonagemdead(escolhaPersonagemMorto);

        
      case "X":
        console.log("\nFoi Ótimo ter você aqui!! \nAte a proxima!!");
        return "exit";
      default:
        clearBash();
        mensagemAtencao = `
### Escolha uma opção válida ###
`;
    }
  }
};


export const menuAcaoPersonagem = async (personagem) => {


  let mensagemAviso = ''
  let status;

while(true){
  if(personagem == null){
      return
  }

  validarEnergiaEHigiene(personagem) //chamar validacao de energia e higiene

  //verificar tempo, caso chegue a 0 o personagem morre
  if(personagem.tempo < 0){
     await mortePersonagem(personagem)
      updateStorageDead(...getStorageDead(), personagem)
      deletarPersonagem(personagem.id)
      console.log('(✖╭╮✖)');
      return
  }
  clearBash()

  const input = await useQuestion(`${ await theCresimsLogo()}

  ${await infoDisplay(personagem)}
  ${mensagemAviso}
  
  ### Escolha uma opção para o(a) ${personagem.nome}

  1 - Trabalhar ⬇⌛️ ⬇🛁 ⬆💵

  2 - Treinar habilidade de ${personagem.aspiracao}  ⬇⌛️ ⬇🛁 ⬆🎮

  3 - Dormir ⬇⌛️ ⬆✨

  4 - Tomar banho ⬇⌛️ ⬇💵 ⬆🛁

  5 - Comprar item ⬇💵 ⬆🎮

  6 - Interagir com outro personagem ⬇⌛️ ⬆❤️

  X - Voltar ao menu principal 🔙

  

  SUA ESCOLHA:`) 


  switch (input.toUpperCase()) {
      case '1':
          //trabalhar
          if (personagem.energia <= 2) {
              mensagemAviso = `
    - Opção ${input} escolhida
    \x1b[33m !!! O personagem precisa de no mínimo 3 de energia para trabalhar !!! \x1b[0m
            `;
              break;
            }
            clearBash();
            mensagemAviso = `
    - Opção ${input} escolhida
            `;
            personagem = await menuTrabalho(personagem);
            break;
    
    

      case '2':
          //treinar habilidade
          clearBash();
      mensagemAviso = `
      - Opção ${input} escolhida
      `;
      personagem = await menuTreinar(personagem);
      break;
  
      case '3':
          //dormir

          if (personagem.energia >= 32) {
              personagem.energia = 32;
              mensagemAviso = `
      - Opção ${input} escolhida
      ### O personagem está com a energia completa ###
       `;
              break;
            }
            mensagemAviso = ``;
    
            clearBash();
            personagem = await menuDormir(personagem);
            break;
    

      case '4':
          //tomar banho

          if (personagem.higiene >= 28) {
              personagem.higiene = 28;
              mensagemAviso = `
          - Opção ${input} escolhida
          ### O personagem está completamente limpo ###
          `;
             
            }
            if (personagem.cresceleons < 10) {
              mensagemAviso = `
          - Opção ${input} escolhida
          !!! O personagem não tem 10 Cresceleons !!!
          `;
             
            }
            mensagemAviso = ``;
            clearBash();
    
            personagem = await menuBanho(personagem, 10)

            break;

      case '5':
          //comprar item
          clearBash();
          mensagemAviso = `
  - Opção ${input} escolhida
          `;
          personagem = await menuDeCompraItens(personagem);
          break;
    
      case '6':
          //interação
          clearBash();
          [personagem, status] = await menuInteracao(personagem);
  
          mensagemAviso = `
  - Opção ${input} escolhida
  \x1b[33m### Interação entre usuarios realizado com sucesso ###\x1b[0m`;
          if (!status) {
              mensagemAviso = `
  - Opção ${input} escolhida
  \x1b[33m!!! Interação não realizada !!!\x1b[0m`;
          }
      break;
      case 'X':
      //voltar menu iniciar
      return startMenu()

       // OPÇÃO INVALIDA e Cheat
    default:
      personagem = await executarCheat(personagem, input);

      mensagemAviso = `
    - Opção ${input} escolhida
     !!! Opção Invalida! Escolha uma opção válida !!!
    `;
      if (verificarCheat(input)) {
          mensagemAviso = `
      ### Cheat aplicado com sucesso ###
      `;
      }

      clearBash();
      break;
}

atualizarPersonagens(personagem);
}
};



