import { getStorage,updateStorage , getStorageDead , updateStorageDead } from "../crud/storage.js"
import { theCresimsLogo } from "../../../interface/menus/theCresimsLogo.js";


export const setPersonagem = async (nome1, aspiracao1) => {
  const id = getId();
  const nome = await nome1 ;
  const aspiracao = await aspiracao1 ;
  const cresceleons = 1500;
  const tempo = 3600000;
  const higiene = 28;
  const energia = 32;
  const relacionamento = [];
  
  const pontosHabilidade = 0;
  const itens = [];
  
  const emojiAspiracaoMap = {
    PINTURA: '🎨',
    GASTRONOMIA: '🍔',
    JOGOS: '🎲',
    MUSICA: '🎼',
    JARDINAGEM: '🪴',
  };

  const emojiAspiracao = emojiAspiracaoMap[aspiracao] || '';

  const personagem = {
    id,
    nome,
    aspiracao,
    cresceleons,
    tempo,
    higiene,
    energia,
    relacionamento,
    pontosHabilidade,
    itens,
    emojiAspiracao,
  };

  updateStorage(...getStorage(), personagem);

  return personagem;
};



export const getPersonagem =  (escolha ) => {
  const storage = getStorage();
  const input =  escolha;
 

  const personagem = storage.find(pers => pers.id == input)
  if(input == 'X' || input == 'x'){
    return personagem
  }
  if(personagem) return personagem


}

export const mostrarPersonagens =  () => {
  
  let mensagemAviso = '### ESCOLHA UM PERSONAGEM ###';

  const storage = getStorage();
  const mensagens = [];
  
mensagens.push(theCresimsLogo())
  mensagens.push('')
  mensagens.push('')
  mensagens.push('')

  mensagens.push(mensagemAviso);
  mensagens.push('')
  for (const obj of storage) {
    mensagens.push(`${obj.id} - ${obj.nome} (Tempo restante: ${obj.tempo})`);
  }
  mensagens.push('')
  mensagens.push('X - RETORNAR');
  
  return mensagens;
};


export const getTodosPersonagens =  (vivo = true) => {


 
  
  let mensagemAviso = '### LISTA DE PERSONAGENS ###';

  let storage = getStorage();

  if (!vivo ) {

     mensagemAviso = '### ESCOLHA UM TUMULO PARA VISITAR ###';

     storage = getStorageDead();
  
  }


  const mensagens = [];
  
mensagens.push(theCresimsLogo())
  mensagens.push('')
  mensagens.push('')
  mensagens.push('')

  mensagens.push(mensagemAviso);
  mensagens.push('')
  for (const obj of storage) {
    mensagens.push(`${obj.id} - ${obj.nome} (Tempo restante: ${obj.tempo})`);
  }
  mensagens.push('')
  mensagens.push('X - RETORNAR');
  
  return mensagens;

}



export const getPersonagemdead =  (escolha ) => {
  const storage = getStorageDead();
  const input =  escolha;
 

  const personagem = storage.find(pers => pers.id == input)
  if(input == 'X' || input == 'x'){
    return personagem
  }
  if(personagem) return personagem

  

}





const getId = (vivo = true) => {
  let storage = getStorage();
  if (!vivo) {
    storage = getStorageDead()
  }
  

  for(let index = 1; true; index++){
    const personagem = storage.find(perso => perso.id == index)

    if(!personagem) return index
    
  }
}

export const deletarPersonagem = (id) => {
  const storage = getStorage();

  const personagemRemovido = storage.find(perso => perso.id == id);
  if (personagemRemovido) {
    personagemRemovido.tempo = 0  
  }
  


  if (personagemRemovido) {
    // Remover o personagem da lista de personagens no jogo
    const novoStorage = storage.filter(perso => perso.id != id);
    personagemRemovido.id = getId(false);

    updateStorage(...novoStorage);

    // Adicionar o personagem removido à lista de personagens mortos
    const storageMortos = getStorageDead();
    storageMortos.push(personagemRemovido);
    updateStorageDead(...storageMortos);
  } else {
    console.log(`Personagem com ID ${id} não encontrado.`);
  }
}

export const atualizarPersonagens = personagem => {
  const listaPersonagens = getStorage()
  const novaLista = listaPersonagens.map((e) => {
    if(personagem.id === e.id){
      return personagem
    }
    return e
  })

  updateStorage(...novaLista)
}


export const validarEnergiaEHigiene = async (personagem) => {
  if(personagem.energia > 32){personagem.energia = 32}
  if(personagem.energia < 0){personagem.energia = 0}
  if(personagem.higiene > 28){personagem.higiene = 28}
  if(personagem.higiene < 0){personagem.higiene = 0}
}

export const verificarCheat = (input) => {
  const inputUpper = input.toUpperCase();
      return (
      inputUpper == "SORTENAVIDA" ||
      inputUpper == "DEITADONAREDE" ||
      inputUpper == "JUNIM" ||
      inputUpper == "SINUSITE"
      );
};

