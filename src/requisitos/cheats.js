import { mortePersonagem } from "../../interface/animacoes/mortePersonagem.js"; 
import { cheatsApi } from "../services/api/api.js"
import { useQuestion } from "../services/question/use-question.js";
export const executarCheat = async (personagem, input) => {
  const listaCheats = await cheatsApi();
  const code = input.toUpperCase();
  const cheat = listaCheats.find((che) => che.codigo == code);

  if (!cheat) return personagem;

  switch (cheat.codigo) {
    case "SORTENAVIDA":
      const salario = personagem.emprego.salario;
      return {
        ...personagem,
        emprego: {
          ...personagem.emprego,
          salario: salario + (salario * cheat.valor) / 100,
        },
      };
    case "DEITADONAREDE":
      let novaEnergia = personagem.energia + 5;
      if (32 <= novaEnergia) {
        novaEnergia = 32;
      }
      return {
        ...personagem,
        energia: novaEnergia,
      };
    case "JUNIM":
      return {
        ...personagem,
        pontosHabilidade: personagem.pontosHabilidade + 5,
      };
    case "CAROLINAS":
      return {
        ...personagem,
        tempo: personagem.tempo + 100000,
      };
    case "SINUSITE":
    // mortePersonagem(personagem);
     
      return {
        ...personagem,
        tempo: 0,
      };
  }
};
