import { empregosApi } from "../services/api/api.js";
import { setEnergiaDois, setTempoVida } from "./comuns.js";
import { checarNivelHabilidade } from "./aspiracoes.js";

const PONTO_ENERGIA_MIN = 2;
const PONTO_ENERGIA_DECREMENTO = 10;
const DIA_TRABALHO = 20000;
const DEZ_PORCENTO = 0.1;
const PONTO_ENERGIA_PARA_DESCONTO = 5;
const DECREMENTO_HIGIENE = 4; 

export const trabalhar = async (personagem) => {
  const personagemTrabalho = { ...personagem };
  const nivelHabilidadePersonagem = checarNivelHabilidade(personagem.pontosHabilidade);

  if (!podeTrabalhar(personagem.energia, personagem.emprego)) {
    return personagem;
  } else if (personagem.energia >= 4 && personagem.energia < 15) {
    const cresceleonsRecalculados = await recalcularCresceleons(personagem, DIA_TRABALHO);
    personagemTrabalho.cresceleons += cresceleonsRecalculados.salario;
    personagemTrabalho.tempo = cresceleonsRecalculados.tempo;
    personagemTrabalho.energia = cresceleonsRecalculados.decrementoEnergia;
    personagemTrabalho.emprego.salario = cresceleonsRecalculados.salario;
  } else if (personagem.energia >= 15) {
    personagemTrabalho.tempo = setTempoVida(personagem, DIA_TRABALHO);
    personagemTrabalho.energia = setEnergiaDois(personagem, PONTO_ENERGIA_DECREMENTO);
    personagemTrabalho.cresceleons = Number(
      (personagemTrabalho.cresceleons + personagem.emprego.salario).toFixed(1)
    );
    personagemTrabalho.emprego.salario = await obterSalario(nivelHabilidadePersonagem, personagem.emprego.cargo);
  }
  
  // Aplicando desconto na higiene após o trabalho
  personagemTrabalho.higiene = Math.max(personagemTrabalho.higiene - DECREMENTO_HIGIENE, 0); // Garantindo que não fique negativo

  if (personagemTrabalho.higiene < 4 && personagemTrabalho.emprego.salario) {
    const descontoSalario = personagemTrabalho.emprego.salario * DEZ_PORCENTO;
    personagemTrabalho.emprego.salario = Number((personagemTrabalho.emprego.salario - descontoSalario).toFixed(1));
    personagemTrabalho.cresceleons = Number((personagemTrabalho.cresceleons - descontoSalario).toFixed(1));
  }

  return personagemTrabalho;
};

export const recalcularCresceleons = async (personagem, diaTrabalho) => {
  const salarioCresim = personagem.emprego.salario;
  const cresceleonPorPontoEnergia = salarioCresim / PONTO_ENERGIA_DECREMENTO;
  const cresceleonDezPorcentoPorPontoEnergia = cresceleonPorPontoEnergia - cresceleonPorPontoEnergia * DEZ_PORCENTO;
  const pontoEnergiaCresimDescansado = personagem.energia - PONTO_ENERGIA_PARA_DESCONTO;
  const pontoEnergiaCresimCansado = PONTO_ENERGIA_PARA_DESCONTO - obterPontoEnergia(personagem.energia);
  const salarioCresimDescansado = pontoEnergiaCresimDescansado * cresceleonPorPontoEnergia;
  const salarioCresimCansado = pontoEnergiaCresimCansado * cresceleonDezPorcentoPorPontoEnergia;
  const tempoMaximoParaTrabalhar = (diaTrabalho / personagem.energia) * (personagem.energia - PONTO_ENERGIA_MIN);

  const tempo = Math.floor(personagem.tempo - tempoMaximoParaTrabalhar);
  const salario = Number((salarioCresimDescansado + salarioCresimCansado).toFixed(1));
  const decrementoEnergia = personagem.energia <= 11 ? PONTO_ENERGIA_MIN : personagem.energia - PONTO_ENERGIA_DECREMENTO;

  return { tempo, salario, decrementoEnergia };
};

export const podeTrabalhar = (energia, emprego) => {
  return energia >= 4 && emprego !== undefined;
};

const obterPontoEnergia = (energia) => {
  if (energia <= 14 && energia >= 13) return energia - PONTO_ENERGIA_DECREMENTO;
  return PONTO_ENERGIA_MIN;
};

export const obterSalario = async (nivelHabilidade, cargo) => {
  try {
    const resposta = await empregosApi();
    const nivelSalario = obterNiveisEmpregados(resposta, cargo);

    const salario = nivelSalario.find((status) => status.nivel === nivelHabilidade);
    if (!salario) {
      throw new Error(`Salário para nível de habilidade ${nivelHabilidade} não encontrado`);
    }

    return salario.valor;
  } catch (erro) {
    console.error("Erro ao obter o salário:", erro.message);
  }
};

const obterNiveisEmpregados = (resposta, cargo) => {
  const empregado = resposta.find((post) => post.cargo === cargo);
  if (!empregado) {
    throw new Error(`Cargo ${cargo} não encontrado`);
  }
  return empregado.salario;
};

export const definirEmprego = async (personagem, cargo) => {
  const nivelHabilidadePersonagem = checarNivelHabilidade(personagem.pontosHabilidade);
  const salario = await obterSalario(nivelHabilidadePersonagem, cargo.cargo);

  const emprego = {
    id: cargo.id,
    nivel: nivelHabilidadePersonagem,
    cargo: cargo.cargo,
    categoria: cargo.categoria,
    salario: salario,
  };

  return { ...personagem, emprego };
};
