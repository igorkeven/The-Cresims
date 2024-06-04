import { useQuestion } from "../../src/services/question/use-question.js";
import { clearBash } from "../../src/requisitos/comuns.js";

export const menuHabilidades = async (text) => {
  let displayMenuHabilidades = true;
  const Gastronomia = "\x1b[36m 🍔 Gastronomia \x1b[0m";
  const Pintura = "\x1b[33m 🎨 Pintura \x1b[0m";
  const Jogos = "\x1b[32m 🎲 Jogos \x1b[0m";
  const Jardinagem = "\x1b[35m 🪴 Jardinagem \x1b[0m";
  const Musica = "\x1b[34m 🎼 Música \x1b[0m";

  while (displayMenuHabilidades == true) {
    clearBash();
    const input = await useQuestion(`
${text}
1.  ${Gastronomia}

2.  ${Pintura}

3.  ${Jogos}

4.  ${Jardinagem}

5.  ${Musica}

X.  Voltar ao menu principal

Sua escolha:`);
    clearBash();

    switch (input) {
      case "1":
        return "GASTRONOMIA";
      case "2":
        return "PINTURA";
      case "3":
        return "JOGOS";
      case "4":
        return "JARDINAGEM";
      case "5":
        return "MUSICA";
      case "x":
        return "x";
      case "X":
        return "X";
      default:
        console.log("### Escolha uma opção válida ###");
    }
  }
};
