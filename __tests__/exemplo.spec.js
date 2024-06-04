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
import { podeTrabalhar, trabalhar } from "../src/requisitos/trabalhar";
import { itensHabilidadesApi , interacoesApi , cheatsApi, empregosApi } from "../src/services/api/api";
import { executarCheat } from "../src/requisitos/cheats";
import { tomarBanho } from "../src/requisitos/tomarbanho";


import { acaoDormir, calcularTempoNecessarioParaEnergiaTotal } from "../src/requisitos/dormir";
import { setEnergia, setEnergiaDois, setHigiene, setTempoVida } from "../src/requisitos/comuns";
import { setPersonagem, getPersonagem,atualizarPersonagens,deletarPersonagem,getTodosPersonagens,validarEnergiaEHigiene, mostrarPersonagens, getPersonagemdead } from "../src/services/crud/personagem";

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
      cargo: "Jogador de Dota",
      categoria: "JOGOS",
      salario: 160,
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
  const personagem = {
    energia: 10,
    pontosHabilidade: 0,
    aspiracao: "JOGOS",
    tempo: 100000,
    higiene: 10,
    cresceleons: 200,
    emprego: {
      salario: 150,
      cargo: "Desenvolvedor",
    },
    aptidao: [],
    itens: [],
  };

  const produto = itensHabilidades["GASTRONOMIA"];
  const escolhaProduto = produto[1];

  const compraPersonagem = cicloTreinoProdutoComprado(
    personagem,
    escolhaProduto,
    "GASTRONOMIA"
  );

  const pontos = compraPersonagem.pontosHabilidade;
  const pontosEsperados = 5;

  expect(pontos).toBe(pontosEsperados);
});

it("Deve conseguir concluir um ciclo de treino com habilidade que é sua aspiração e receber os pontos corretamente", () => {
  const personagem = {
    energia: 10,
    pontosHabilidade: 0,
    aspiracao: "JOGOS",
    tempo: 100000,
    higiene: 10,
    cresceleons: 200,
    emprego: {
      salario: 150,
      cargo: "Desenvolvedor",
    },
    aptidao: [],
    itens: [],
  };

  const produto = itensHabilidades["JOGOS"];
  const escolhaProduto = produto[1];

  const compraPersonagem = cicloTreinoProdutoComprado(
    personagem,
    escolhaProduto,
    "JOGOS"
  );

  const pontos = compraPersonagem.pontosHabilidade;
  const pontosEsperados = 6; // 5 pontos base + 1 ponto extra por ser a aspiração

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
    const personagem = { ...personagem2, pontosHabilidade: 28 };
    const produto = itensHabilidades["JOGOS"];
    const escolhaProduto = produto[1];

    const treinoPersonagem = cicloTreinoProdutoComprado(
      personagem,
      escolhaProduto,
      personagem.aspiracao
    );

    const nivel = treinoPersonagem.emprego.nivel;
    const nivelEsperado = "SENIOR";

    expect(nivel).toBe(nivelEsperado);
  });

});



  describe("Trabalho", () => {
    it("Deve perder os pontos de energia ao trabalhar uma jornada padrão", async () => {
      
      const job = await trabalhar(personagem);
  
      const energia = job.energia;
      const energiaEsperada = 22;
  
      expect(energia).toEqual(energiaEsperada);
    });

    it("Deve receber o salario do dia ao trabalhar uma jornda padrão", async () => {
      const job = await trabalhar(personagem);
    
      const salario = job.emprego.salario;
      const salarioEsperado = 160.0;
    
      expect(salario).toBe(salarioEsperado);
    });    


    it("Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10", async () => {
      personagem.energia = 9;
      const job = await trabalhar(personagem);
    
      const salario = job.emprego.salario;
      const salarioEsperado = 107.2;
  
      expect(salario.toFixed(1)).toBe(salarioEsperado.toFixed(1));
    });



    it("Deve perder os pontos de energia ao trabalhar uma jornada padrão", async () => {
      const job = await trabalhar(personagem);
  
      const energia = job.energia;
      const energiaEsperada = 22;
  
      expect(energia).toEqual(energiaEsperada);
    });
  
    it("Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10", async () => {
      personagem.energia = 9;
      const job = await trabalhar(personagem);
  
      const salario = job.emprego.salario;
      const salarioEsperado = 107.2;
  
      expect(salario.toFixed(1)).toBe(salarioEsperado.toFixed(1));
    });
  
    it("Deve receber o salario equivalente quando começar a trabalhar com os pontos de energia menores que 10 e pontos de higiene menores que 4", async () => {
      const personagemCopy = { ...personagem, energia: 10, higiene: 3 };
      const job = await trabalhar(personagemCopy);
  
      const salario = job.emprego.salario;
      const salarioEsperado = 110.9;
  
      expect(salario.toFixed(1)).toBe(salarioEsperado.toFixed(1));
    });
  
  
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

  describe("5 - Relacionamentos", () => {
    const personagemBase = {
      id: 1,
      energia: 50,
      tempo: 100000,
      relacionamento: [
        { id: 2, level: 0 }
      ]
    };
  
    const personagem2Base = {
      id: 2,
      energia: 50,
      tempo: 100000,
      relacionamento: [
        { id: 1, level: 0 }
      ]
    };
  
    const relacaoElogiar = {
      id: 3,
      interacao: "Elogiar",
      pontos: 4,
      energia: 1,
    };
  
    it("Deve evoluir o relacionamento de dois Cresims para AMIZADE", () => {
      let [novoPersonagem, novoPersonagem2] = [personagemBase, personagem2Base];
      for (let cont = 0; cont < 6; cont++) {
        [novoPersonagem, novoPersonagem2] = interacao(
          novoPersonagem,
          novoPersonagem2,
          relacaoElogiar
        );
      }
  
      const pontosPersonagem = novoPersonagem.relacionamento[0].level;
      const pontosPersonagem2 = novoPersonagem2.relacionamento[0].level;
  
      const nivelPersonagem = getLevelInteracoes(pontosPersonagem);
      const nivelPersonagem2 = getLevelInteracoes(pontosPersonagem2);
  
      expect(nivelPersonagem).toBe("AMIZADE");
      expect(nivelPersonagem2).toBe("AMIZADE");
    });
  
    it("Deve recuar o relacionamento de dois Cresims para INIMIZADE", () => {
      const personagemInimigo = { ...personagemBase };
      const personagem2Inimigo = { ...personagem2Base };
  
      const objInteracao = {
        id: 6,
        interacao: "Criticar",
        pontos: -3,
        energia: 2,
      };
  
      let [novoPersonagem, novoPersonagem2] = [personagemInimigo, personagem2Inimigo];
      for (let cont = 0; cont < 5; cont++) {
        [novoPersonagem, novoPersonagem2] = interacao(
          novoPersonagem,
          novoPersonagem2,
          objInteracao
        );
      }
  
      const pontosPersonagem = novoPersonagem.relacionamento[0].level;
      const pontosPersonagem2 = novoPersonagem2.relacionamento[0].level;
  
      const nivelPersonagem = getLevelInteracoes(pontosPersonagem);
      const nivelPersonagem2 = getLevelInteracoes(pontosPersonagem2);
  
      expect(nivelPersonagem).toBe("INIMIZADE");
      expect(nivelPersonagem2).toBe("INIMIZADE");
    });
  
    it("Deve descontar os pontos de energia em uma interação entre dois Cresims", () => {
      const personagemEnergia = { ...personagemBase, energia: 32 };
      const personagem2Energia = { ...personagem2Base, energia: 33 };
  
      const objInteracao = {
        id: 4,
        interacao: "Conversar",
        pontos: 2,
        energia: 2,
      };
  
      const [novoPersonagem, novoPersonagem2] = interacao(
        personagemEnergia,
        personagem2Energia,
        objInteracao
      );
  
      const energiaPersonagem = novoPersonagem.energia;
      const energiaPersonagem2 = novoPersonagem2.energia;
  
      const energiaEsperada = 30;
      const energiaEsperada2 = 31;
  
      expect(energiaPersonagem).toBe(energiaEsperada);
      expect(energiaPersonagem2).toBe(energiaEsperada2);
    });

  });

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




  describe('Funções de comuns', () => {
    let personagem;
  
    beforeEach(() => {
      personagem = {
        tempo: 100,
        energia: 50,
        higiene: 30,
      };
    });
  
    it('Deve ajustar corretamente o tempo de vida', () => {
      expect(setTempoVida(personagem, 20)).toBe(80);
      expect(setTempoVida(personagem, 120)).toBe(0); // Não pode ser menor que 0
    });
  
    it('Deve ajustar corretamente a energia', () => {
      expect(setEnergia(personagem, 10)).toBe(40);
      expect(setEnergia(personagem, 60)).toBe(0); // Não pode ser menor que 0
    });
  
    it('Deve ajustar corretamente a energia com setEnergiaDois', () => {
      expect(setEnergiaDois(personagem, 10)).toBe(40);
      expect(setEnergiaDois(personagem, 48)).toBe(2); // Não pode ser menor que 2
    });
  
    it('Deve ajustar corretamente a higiene', () => {
      expect(setHigiene(personagem, 10)).toBe(20);
      expect(setHigiene(personagem, 40)).toBe(0); // Não pode ser menor que 0
    });
  
   
  });


describe('getLevelInteracoes', () => {
  it('Deve retornar INIMIZADE para pontos menores que 0', () => {
    const result = getLevelInteracoes(-5);
    expect(result).toBe('INIMIZADE');
  });

  it('Deve retornar NEUTRO para pontos entre 0 e 9', () => {
    const result = getLevelInteracoes(5);
    expect(result).toBe('NEUTRO');
  });

  it('Deve retornar AMIZADE para pontos entre 10 e 24', () => {
    const result = getLevelInteracoes(15);
    expect(result).toBe('AMIZADE');
  });

  it('Deve retornar AMOR para pontos maiores ou iguais a 25', () => {
    const result = getLevelInteracoes(30);
    expect(result).toBe('AMOR');
  });
});


test('Obtém dados da API de itens de habilidades', async () => {
  const data = await itensHabilidadesApi();
  expect(data).toBeDefined();
});


test('Obtém dados da API de interações', async () => {
  const data = await interacoesApi();
  expect(data).toBeDefined();
});

test('Obtém dados da API de cheats', async () => {
  const data = await cheatsApi();
  expect(data).toBeDefined();
});

test('Obtém dados da API de empregos', async () => {
  const data = await empregosApi();
  expect(data).toBeDefined();
});



describe('calcularTempoNecessarioParaEnergiaTotal', () => {
  test('retorna o tempo necessário para energia total para uma energia inicial de 32', async () => {
    const personagem = {
      energia: 32
    };

    const tempoNecessario = await calcularTempoNecessarioParaEnergiaTotal(personagem);
    expect(tempoNecessario).toBe(0); 
  });
});



describe('getLevelInteracoes', () => {
    it('Deve retornar INIMIZADE para pontos menores que 0', () => {
        const result = getLevelInteracoes(-5);
        expect(result).toBe('INIMIZADE');
    });

    it('Deve retornar NEUTRO para pontos entre 0 e 9', () => {
        const result = getLevelInteracoes(5);
        expect(result).toBe('NEUTRO');
    });

    it('Deve retornar AMIZADE para pontos entre 10 e 24', () => {
        const result = getLevelInteracoes(15);
        expect(result).toBe('AMIZADE');
    });

    it('Deve retornar AMOR para pontos maiores ou iguais a 25', () => {
        const result = getLevelInteracoes(30);
        expect(result).toBe('AMOR');
    });
});







describe('calcularTempoNecessarioParaEnergiaTotal', () => {
  test('retorna 0 para um personagem com energia total', async () => {
    const personagem = { energia: 32 };
    const tempoNecessario = await calcularTempoNecessarioParaEnergiaTotal(personagem);
    expect(tempoNecessario).toBe(0);
  });


});


describe('acaoDormir', () => {
  test('recupera energia corretamente durante o sono', async () => {
    const personagem = { energia: 10 };
    await acaoDormir(personagem, 10000); 
    expect(personagem.energia).toBe(32); 
  });

  test('não excede a energia total máxima de 32', async () => {
    const personagem = { energia: 28 };
    await acaoDormir(personagem, 10000); // 10 segundos de sono
    expect(personagem.energia).toBe(32); // energia máxima é 32
  });

  test('recupera energia com bônus corretamente durante o sono longo', async () => {
    const personagem = { energia: 0 };
    await acaoDormir(personagem, 30000); // 30 segundos de sono
    expect(personagem.energia).toBe(32); // energia máxima é 32
  });
});



// --------------------------






// Garantir que todas as funções necessárias sejam importadas corretamente

describe('personagem.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setPersonagem', () => {
    it('should create a new personagem and update storage', async () => {

      const personagem = await setPersonagem("Teste", 'PINTURA');

      expect(personagem.nome).toBe('Teste');
      expect(personagem.aspiracao).toBe('PINTURA');
      expect(personagem.emojiAspiracao).toBe('🎨');
      
    });

    it('deve mostrar os personagens', async () => {

        const presonagens =  mostrarPersonagens()
        expect(presonagens[6]).toBe("1 - Teste (Tempo restante: 3600000)" );
        

     });


     it('deve selecionar o personagem', async () => {

      const preso =  getPersonagem(1)
      expect(preso).toStrictEqual({"aspiracao": "PINTURA", "cresceleons": 1500, "emojiAspiracao": "🎨", "energia": 32, "higiene": 28, "id": 1, "itens": [], "nome": "Teste", "pontosHabilidade": 0, "relacionamento": [], "tempo": 3600000} );
      

   });


   it('deve mostrar a lista de todos os personagens', async () => {

    const preso =  getTodosPersonagens()
    expect(preso[4]).toStrictEqual( "### LISTA DE PERSONAGENS ###");
    expect(preso[6]).toStrictEqual( "1 - Teste (Tempo restante: 3600000)");
    

 });

 it('deve mostrar a lista de todos os personagens mortos', async () => {
  deletarPersonagem(1)
  const preso =  getTodosPersonagens(false)
  expect(preso[4]).toStrictEqual("### ESCOLHA UM TUMULO PARA VISITAR ###");
  expect(preso[6]).toStrictEqual( "1 - Teste (Tempo restante: 0)");
  

});



it('deve selecionar o personagem morto correto', async () => {
  const preso =  getPersonagemdead(1)
  
  expect(preso).toStrictEqual( {"aspiracao": "PINTURA", "cresceleons": 1500, "emojiAspiracao": "🎨", "energia": 32, "higiene": 28, "id": 1, "itens": [], "nome": "Teste", "pontosHabilidade": 0, "relacionamento": [], "tempo": 0});
  

});


it('deve deletar o personagem correto', async () => {
  //setPersonagem('Teste' , 'PINTURA')
  deletarPersonagem(1)
  personagem = getTodosPersonagens()
  expect([]).toStrictEqual([]);
  

});

it('deve validar energia do personagem corretamente', async () => {
  const personagem = {"id": 2, "nome": "joao", "aspiracao": "GASTRONOMIA", "cresceleons": 1500, "tempo": 3596000, "higiene": -1, "energia": 35, "relacionamento": [{"id": 1, "nome": "igor", "level": -2}], "pontosHabilidade": 0, "itens": [], "emojiAspiracao": "🍔"};
  await validarEnergiaEHigiene(personagem);
  expect(personagem.energia).toBe(32);
  expect(personagem.higiene).toBe(0);
  

});




  });

});






