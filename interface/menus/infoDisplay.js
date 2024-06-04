import { checarNivelHabilidade } from "../../src/requisitos/aspiracoes.js";

const getListaItens = async (personagem) => {
    let list = ''
    personagem.itens.forEach(element => {
        list += element + ', '
    });
    return list
}

export const infoDisplay = async (personagem) => {
    let emprego = "Desenpregado"
    let salario = "Ainda sem salario"
    if (personagem.emprego) {
        emprego = personagem.emprego.cargo
        salario = `${personagem.emprego.salario}`
    } 
    return `### Meu nome é ${personagem.nome} ###
    
    ( ͡° ͜ʖ ͡°)━👍🏽

    Tempo de jogo: ${personagem.tempo}
    Energia: ${personagem.energia}/32
    Higiene: ${personagem.higiene}/28
    Cresceleons: ${personagem.cresceleons}
    ${personagem.emojiAspiracao} Pontos de ${personagem.aspiracao}: ${personagem.pontosHabilidade} (${checarNivelHabilidade(personagem.pontosHabilidade)})
    Emprego: ${emprego}
    Salario: ${salario}
    Itens: ${await getListaItens(personagem)}`
    

   

}