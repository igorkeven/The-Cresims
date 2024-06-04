import { theCresimsLogo } from "../menus/theCresimsLogo.js";

export const animacaoTrabalhando = async (personagem, display) => {
  if (display === true) {
    console.clear();

    const cenas = [
      ` ${await theCresimsLogo()} 

  ⊙  |   |  
 /|\\ |   |  
 / \\  \\_/  

   1 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙  /|   |  
 /|\\ |    |  
 / \\  \\_/  

   2 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   /|  |  
 /|\\  |    |  
 / \\   \\_/  

   3 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\  \\  |  
 / \\   \\_/  

   4 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   \\  |  
 / \\   \\_/  

   5 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

   6 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

   7 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

   8 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

   9 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  10 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  11 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  12 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  13 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  14 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  15 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  16 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  17 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  18 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  19 / 20

${personagem.nome} está trabalhando.`,
      ` ${await theCresimsLogo()} 

  ⊙   |   |  
 /|\\   |  |  
 / \\   \\_/  

  20 / 20

${personagem.nome} terminou de trabalhar!


Pressione ENTER para continuar...`
    ];

    for (let i = 0; i < cenas.length; i++) {
      console.log(cenas[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.clear();
    }
  }
};
