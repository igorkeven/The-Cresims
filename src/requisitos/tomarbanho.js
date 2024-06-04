export const tomarBanho = async (personagem) => {
    personagem.higiene = 28;
    personagem.cresceleons -= 10;
  
    return personagem;
  };