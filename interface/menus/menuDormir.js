import { 
    calcularTempoNecessarioParaEnergiaTotal,
    acaoDormir
  } from "../../src/requisitos/dormir.js"
  import { useQuestion } from "../../src/services/question/use-question.js";
  import { infoDisplay } from "./infoDisplay.js";
  import { theCresimsLogo } from "./theCresimsLogo.js";
  
  export const menuDormir  = async (personagem) => {
      console.clear();
      let tempoDeSono = 0;
      let mensagemAviso = ``;
    
      while (true) {
        console.clear();
        let input = await useQuestion(`
    ${await theCresimsLogo()}
    
    ${await infoDisplay(personagem)}
    
    Quanto tempo você quer dormir?
    ${mensagemAviso}
    1. 1 ciclo de sono  ( -5000 🕗  +4 🔋 )
    2. 2 ciclos de sono ( -10000 🕗  +10 🔋 )
    3. 3 ciclos de sono ( -15000 🕗 +18 🔋 )
    4. 4 ciclos de sono ( -20000 🕗  +28 🔋 )
    5. Até recuperar toda a energia ( -${await calcularTempoNecessarioParaEnergiaTotal(
        personagem
        )}🕗  +100% 🔋 )
    
    X. Voltar ao menu de ações
    
    Sua escolha:`);
        input = input.toUpperCase();
    
        switch (input) {
          case "5":
            await acaoDormir(
                personagem,
              (await calcularTempoNecessarioParaEnergiaTotal(personagem)) / 1000,
              true
            );
    
            return personagem;
    
          case "1":
            tempoDeSono  = 5;
            await acaoDormir(personagem, tempoDeSono, true);
    
            return personagem;
    
          case "2":
            tempoDeSono = 10;
            await acaoDormir(personagem, tempoDeSono, true);
    
            return personagem;
    
          case "3":
            tempoDeSono = 15;
            await acaoDormir(personagem, tempoDeSono, true);
    
            return personagem;
    
          case "4":
            tempoDeSono = 20;
            await acaoDormir(personagem, tempoDeSono, true);
    
            return personagem;
    
          case "X":
            return personagem;
    
          default:
            console.clear();
            mensagemAviso = `
    - Opção ${input} escolhida
    ### Escolha uma opção válida ###
    `;
            break;
        }
      }
    };