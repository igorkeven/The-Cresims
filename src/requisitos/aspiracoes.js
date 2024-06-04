import { setTempoVida, setHigiene, setEnergiaDois } from "../requisitos/comuns.js"

const TEMPO_CICLO_TREINO = 8000
const PERDA_ENERGIA = 4
const PERDA_HIGIENE = 2

export const setHabilidade = (personagem, escolhaProduto, escolhaHabilidade) => {
  if (!personagem.pontosHabilidade) {
    console.log('Inicializando pontosHabilidade');
    personagem.pontosHabilidade = 0;
  }

  console.log('Calculando pontosHabilidade:', personagem.pontosHabilidade, escolhaProduto.pontos);
  let pontosBase = escolhaProduto.pontos;

  if (personagem.aspiracao === escolhaHabilidade) {
    pontosBase += 1;
  }

  return personagem.pontosHabilidade + pontosBase;
}

export const cicloTreinoProdutoComprado = (personagem, escolhaProduto, escolhaHabilidade) => {
  const personagemTreinando = { ...personagem }

  if (!personagemTreinando.aptidao) {
    personagemTreinando.aptidao = []
  }

  const pontosHabilidade = setHabilidade(personagemTreinando, escolhaProduto, escolhaHabilidade)
  console.log('pontosHabilidade após setHabilidade:', pontosHabilidade);
  const tempo = setTempoVida(personagemTreinando, TEMPO_CICLO_TREINO)
  const energia = setEnergiaDois(personagemTreinando, PERDA_ENERGIA)
  const nivelHabilidade = checarNivelHabilidade(pontosHabilidade)
  const emprego = { ...personagemTreinando.emprego, nivel: nivelHabilidade }
  const higiene = setHigiene(personagemTreinando, PERDA_HIGIENE)

  let aptidao = [...personagemTreinando.aptidao]
  const aptidaoExistente = containAptidao(personagemTreinando.aptidao, escolhaHabilidade)

  if (aptidaoExistente) {
    aptidao = aptidao.map(aptidaoItem => {
      if (aptidaoItem.nome === escolhaHabilidade) {
        return { ...aptidaoItem, pontosHabilidade: aptidaoItem.pontosHabilidade + escolhaProduto.pontos }
      }
      return aptidaoItem
    })
  } else {
    aptidao = [...personagemTreinando.aptidao, { nome: escolhaHabilidade, pontosHabilidade: escolhaProduto.pontos }]
  }

  return { ...personagemTreinando, pontosHabilidade, tempo, energia, emprego, higiene, aptidao }
}

export const comprarItens = (personagem, escolhaProduto) => {
  const comprasPersonagem = { ...personagem }

  if (!personagem || !escolhaProduto) {
    return personagem
  }

  if (podeComprar(personagem.cresceleons, escolhaProduto.preco)) {
    comprasPersonagem.cresceleons = Number((comprasPersonagem.cresceleons - escolhaProduto.preco).toFixed(1))
    comprasPersonagem.itens.push(escolhaProduto.nome)
    return comprasPersonagem
  }

  return undefined
}

export const podeComprar = (cresceleons, precoProdutoEscolhido) => {
  return cresceleons >= precoProdutoEscolhido;
}

export const checarNivelHabilidade = (pontos) => {
  if (pontos >= 0 && pontos <= 16) return 'JUNIOR'
  if (pontos >= 17 && pontos <= 26) return 'PLENO'
  if (pontos >= 27) return 'SENIOR'
}

export const containAptidao = (aptidoes, novaAptidao) => {
  return aptidoes.find(aptidao => aptidao.nome === novaAptidao)
}
