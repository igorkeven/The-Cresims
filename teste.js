import {
  comprarItens,
  checarNivelHabilidade,
  cicloTreinoProdutoComprado,
  podeComprar,
} from "../src/requisitos/aspiracoes";
import {
  getLevelInteracoes,
  interacao,
  listaDeInteracoes,
} from "../src/requisitos/interacao";
import { obterSalario, podeTrabalhar, trabalhar } from "../src/requisitos/trabalhar";
import { itensHabilidadesApi } from "../src/services/api/api";
import { executarCheat } from "../src/requisitos/cheats";
import { tomarBanho } from "../src/requisitos/tomarbanho";
import { validarEnergiaEHigiene } from "../interface/menus/menuAcaoPersonagem";
import { acaoDormir } from "../src/requisitos/dormir";
import { setEnergia, setEnergiaDois, setHigiene, setTempoVida } from "../src/requisitos/comuns";
import { menuTreinar } from "../interface/menus/menuTreinar";

let personagem, personagem2;
let itensHabilidades, produto, escolhaProduto;

beforeAll(async () => {
  itensHabilidades = await itensHabilidadesApi();
});

beforeEach(() => {
  personagem = {
    id: 1,
    nome: "Joao",
    aspiracao: "JOGOS",
    cresceleons: 1500,
    tempo: 3600000,
    higiene: 28,
    energia: 32,
    relacionamento: [
      {
        id: 2,
        nome: "Maria",
        nivel: 0,
      },
    ],
    pontosHabilidade: 0,
    itens: [],
    emprego: {
      id: 1,
      emprego: "Jogador de Dota",
      categoria: "JOGOS",
      salario: 160,
      nivel :"JUNIOR"
    },
    aptidao: [
      {
        nome: "GASTRONOMIA",
        pontosHabilidade: 0,
      },
      {
        nome: "JOGOS",
        pontosHabilidade: 0,
       
      },
    ],
  };

  personagem2 = {
    ...personagem,
    id: 2,
    nome: "Maria",
    relacionamento: [
      {
        id: 1,
        nome: "Joao",
        nivel: 0,
      },
    ],
  };

  produto = itensHabilidades[personagem.aspiracao];
  escolhaProduto = produto[0];
});

describe("Regras Gerais", () => {
  it("Deve conseguir criar um novo Cresim com nome, pontos de higiene e energia carregados e 1500 Cresceleons", async () => {
    const dadosEsperados = ["Joao", 28, 32, 1500];

    expect([
      personagem.nome,
      personagem.higiene,
      personagem.energia,
      personagem.cresceleons,
    ]).toMatchObject(dadosEsperados);
  });

it("Deve conseguir atribuir uma aspiração ao Cresim  ", async () => {
  const dadosEsperados = "JOGOS";

  expect(personagem.aspiracao).toBe(dadosEsperados);
});


it("Deve validar os pontos de energia do personagem para que não passem de 32 pontos", async () => {
  personagem.energia += 1000;

  await validarEnergiaEHigiene(personagem);

  const dadosEsperados = 32;

  expect(personagem.energia).toBe(dadosEsperados);
});


it("Deve validar os pontos de energia do personagem para que não fiquem negativados  ", async () => {
  personagem.energia -= 1000;

  await validarEnergiaEHigiene(personagem);

  const dadosEsperados = 0;

  expect(personagem.energia).toBe(dadosEsperados);
});

});

describe("Energia", () => {
  it("Deve conseguir dormir e receber seus pontos de energia", async () => {
    personagem.energia = 0;

    await acaoDormir(personagem, 15, false);

    const dadosEsperados = 18;

    expect(personagem.energia).toBe(dadosEsperados);
  });
});

describe("Habilidades", () => {
  it("Deve conseguir comprar um item de habilidade", () => {
    personagem.cresceleons += 5000;
    const compraPersonagem = comprarItens(personagem, escolhaProduto);

    const itemComprado = compraPersonagem.itens;
    const itemEsperado = ["Mouse com led"];

    expect(itemComprado).toEqual(itemEsperado);
  });

  it("Deve validar ao tentar comprar um item de habilidade sem Cresceleons suficientes", () => {
    const cresceleons = 500;
    const boolean = podeComprar(cresceleons, escolhaProduto.preco);

    expect(boolean).not.toBeTruthy();
  });

  it("Deve conseguir concluir um ciclo de treino com habilidade que não é aspiração e receber os pontos corretamente", () => {
    const produto = itensHabilidades["GASTRONOMIA"];
    const escolhaProduto = produto[1];

    const compraPersonagem = cicloTreinoProdutoComprado(
      personagem,
      escolhaProduto,
      "JOGOS"
    );

    const pontos = compraPersonagem.pontosHabilidade ;
    const pontosEsperados = 6;

    expect(pontos).toBe(pontosEsperados);
  });

  it("Deve conseguir concluir um ciclo de treino com habilidade que é sua aspiração e receber os pontos corretamente", () => {
    const produto = itensHabilidades["JOGOS"];
    const escolhaProduto = produto[1];

    const compraPersonagem = cicloTreinoProdutoComprado(
      personagem,
      escolhaProduto,
      "JOGOS"
    );

    const pontos = compraPersonagem.pontosHabilidade;
    const pontosEsperados = 6;

    expect(pontos).toBe(pontosEsperados);
  });

  it("Deve perder pontos de energia ao terminar um ciclo de treino", () => {
    const compraPersonagem = cicloTreinoProdutoComprado(
      personagem,
      escolhaProduto,
      "JOGOS"
    );
  
    const pontos = compraPersonagem.energia;
    const pontosEsperados = 28;

    expect(pontos).toBe(pontosEsperados);
  });

  it("Deve perder pontos de higiene ao terminar um ciclo de treino", () => {
    const compraPersonagem = cicloTreinoProdutoComprado(
      personagem,
      escolhaProduto,
      "JOGOS"
    );

    const pontos = compraPersonagem.higiene;
    const pontosEsperados = 26;

    expect(pontos).toBe(pontosEsperados);
  });


  it("Deve avançar o nivel de habilidade quando completar os pontos necessarios", () => {
    const nivelPersonagem = { ...personagem };
    nivelPersonagem.pontosHabilidade = 28;

    const treinoPersonagem = cicloTreinoProdutoComprado(
      nivelPersonagem,
      escolhaProduto,
      nivelPersonagem.aspiracao
    );

    const nivel = treinoPersonagem.emprego.nivel;
    const nivelEsperado = "SENIOR";

    expect(nivel).toBe(nivelEsperado);
  });

});

  describe("Trabalho", () => {
    // it("Deve perder os pontos de energia ao trabalhar uma jornada padrão", async () => {
      
    //   const job = await trabalhar(personagem);
  
    //   const energia = job.energia;
    //   const energiaEsperada = 22;
  
    //   expect(energia).toEqual(energiaEsperada);
    // });

    it("Deve receber o salario do dia ao trabalhar uma jornda padrão", async () => {


      
      const salario = obterSalario( personagem.pontosHabilidade,personagem.emprego.cargo);
      
      const salarioEsperado = 160.0;
  
      expect(salario).toBe(salarioEsperado);
    });

    // it("Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10", async () => {
    //   personagem.energia = 9;
    //   const job = await trabalhar(personagem);
    //   console.log(job)
    //   const salario = job.emprego.salario;
    //   const salarioEsperado = 107.2;
  
    //   expect(salario.toFixed(1)).toBe(salarioEsperado.toFixed(1));
    // });

    // it("Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4", async () => {
    //   const characterCopy = { ...character };
  
    //   characterCopy.energy = 10;
    //   characterCopy.hygiene = 3;
  
    //   const characterWork = await work(characterCopy);
  
    //   const salary = characterWork.employee.salary;
    //   const salaryExpected = 110.9;
  
    //   expect(salary).toBe(salaryExpected);
    // });
  
    it("Deve validar para que o Cresim não consiga começar a trabalhar com os pontos de energia menores que 4", async () => {
      const ENERGIA_CRESCIM = 3;
  
      const boolWork = podeTrabalhar(ENERGIA_CRESCIM, personagem.emprego);
      const boolWorkExpected = false;
  
      expect(boolWork).toBe(boolWorkExpected);
    });

  });

  describe("Higiene", () => {

    it("Deve descontar 10 Cresceleons ao tomar banho ", async () => {
        const joao = await tomarBanho(personagem, 10, false);
        const cresceleonsEsperados = 1490;
        expect(joao.cresceleons).toBe(cresceleonsEsperados);
      });

  });

  // describe("5 - Relacionamentos", () => {
  //   it("Deve evoluir o relacionamento de dois Cresims para AMIZADE", () => {
  //     const relacao = {
  //       id: 3,
  //       interacao: "Elogiar",
  //       pontos: 4,
  //       energia: 1,
  //     };
  


  //     let [novoPersonagem, novoPersonagem2] = [personagem, personagem2];
  //     for (let cont = 0; cont < 4; cont++) {
  //       [novoPersonagem, novoPersonagem2] = interacao(
  //         novoPersonagem,
  //         novoPersonagem2,
  //         relacao
  //       );
  //     }
  
  //     const pontosPersonagem = novoPersonagem.relacionamento[0].nivel;
  //     const pontosPersonagem2 = novoPersonagem2.relacionamento[0].nivel;

  //     const nivelPersonagem = getLevelInteracoes(pontosPersonagem);
  //     const nivelPersonagem2 = getLevelInteracoes(pontosPersonagem2);

  //     console.log(nivelPersonagem)
  
  //     expect(nivelPersonagem).toBe(13);

  //     //expect(nivelPersonagem).toBe("AMIZADE");
  //     //expect(nivelPersonagem2).toBe("AMIZADE");
  //   });

  //   it("Deve recuar o relacionamento de dois Cresims para INIMIZADE", () => {
  //     const objInteraction = {
  //       id: 6,
  //       interacao: "Criticar",
  //       pontos: -3,
  //       energia: 2,
  //     };
  
  //     const [newCharacter, newCharacter_02] = interaction(
  //       character,
  //       character_02,
  //       objInteraction
  //     );
  
  //     const pointsCharacter = newCharacter.relationship[0].level;
  //     const pointsCharacter_02 = newCharacter_02.relationship[0].level;
  
  //     const levelCharacter = getLevelInteraction(pointsCharacter);
  //     const levelCharacter_02 = getLevelInteraction(pointsCharacter_02);
  
  //     expect(levelCharacter).toBe("INIMIZADE");
  //     expect(levelCharacter_02).toBe("INIMIZADE");
  //   });

  //   it("Deve descontar os pontos de energia em uma interação entre dois Cresims", () => {
  //     const objInteraction = {
  //       id: 4,
  //       interacao: "Conversar",
  //       pontos: 2,
  //       energia: 2,
  //     };
  
  //     const [newCharacter, newCharacter_02] = interaction(
  //       character,
  //       character_02,
  //       objInteraction
  //     );
  
  //     const energyCharacter = newCharacter.energy;
  //     const energyCharacter_02 = newCharacter_02.energy;
  
  //     const energyExpect = 30;
  //     const energyExpect_02 = 31;
  
  //     expect(energyCharacter).toBe(energyExpect);
  //     expect(energyCharacter_02).toBe(energyExpect_02);
  //   });

  // });

  describe("6 - Cheats", () => {

    it("Deve conseguir aplicar o cheat SORTENAVIDA e receber as recompensas", async () => {
      const novoPersonagem = await executarCheat(personagem, "SORTENAVIDA");
      const numeroEsperado = 176;
      expect(novoPersonagem.emprego.salario).toBe(numeroEsperado);
    });

    it("Deve conseguir aplicar o cheat DEITADONAREDE e receber as recompensas", async () => {
      const novoPersonagem = { ...personagem, energia: 27 };
      const personagemTeste = await executarCheat(novoPersonagem, "DEITADONAREDE");
      const numeroEsperado = 32;
      expect(personagemTeste.energia).toBe(numeroEsperado);
    });

    it("Deve conseguir aplicar o cheat JUNIM e receber as recompensas para a habilidade escolhida", async () => {
      const novoPersonagem = await executarCheat(personagem, "JUNIM");
      const nivelHabilidade = novoPersonagem.pontosHabilidade;
      const numeroEsperado = 5;
      expect(nivelHabilidade).toBe(numeroEsperado);
    });

    it("Deve conseguir aplicar o cheat CAROLINAS e receber as recompensas", async () => {
      const novoPersonagem = await executarCheat(personagem, "CAROLINAS");
      const numeroEsperado = 3700000;
      expect(novoPersonagem.tempo).toBe(numeroEsperado);
    });
  
    it("Deve conseguir aplicar o cheat SINUSITE ter a vida zerada", async () => {
      const novoPersonagem = await executarCheat(personagem, "SINUSITE");
      const numeroEsperado = 0;
      expect(novoPersonagem.tempo).toBe(numeroEsperado);
    });

  });














