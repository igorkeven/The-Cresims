
const epitafios = [
    "Aqui descansa alguém que viveu com paixão e amor.",
    "Partiu, mas deixou um legado de sorrisos e boas lembranças.",
    "Sua luz brilhará eternamente em nossos corações.",
    "Aqui jaz um(a) amante da natureza e das estrelas.",
    "Viveu uma vida plena e partiu com serenidade.",
    "Seu espírito livre encontrou paz neste solo.",
    "Adeus, querido(a) amigo(a), até nos encontrarmos novamente",
    "Um(a) sonhador(a) que voou alto e tocou o céu.",
    "Aqui repousa alguém que amou profundamente.",
    "Sua jornada terrena chegou ao fim, mas sua alma permanece viva.",
];

export const mortePersonagem = async (personagem) => {
  console.clear();
  console.log(`

                     ||   ||
                     ||   ||
                     ||   ||
          _ _ _ _ _ _||   ||_ _ _ _ _ _
          
          Aqui jaz ${personagem.nome}... 
          _ _ _ _ _       _ _ _ _ _ _ _
                     ||   ||
                     ||   ||        (✖╭╮✖)
                     ||   ||    +-----------------------------------------------------------------------+
                     ||   ||    |                                                                       |
                     ||   ||    |“${epitafios[Math.floor(Math.random() * 9)]}”                          |
                     ||   ||    |                                                                       |
                     ||   ||    +-----------------------------------------------------------------------+
                     

`);
  
await new Promise((resolve) => setTimeout(resolve, 1000));
  return personagem;
};