import axios from "axios";

export const itensHabilidadesApi = async () => {
  try {
    const response = await axios.get(
      "https://emilyspecht.github.io/the-cresim/itens-habilidades.json"
    );
    return response.data;
  } catch {
   // console.error("Ocorreu um error ao acessar a API de itens");
  }
};

export const empregosApi = async () => {
  try {
    const response = await axios.get(
      "https://emilyspecht.github.io/the-cresim/empregos.json"
    );
    return response.data;
  } catch {
   // console.error("Ocorreu um error ao acessar a API de empregos");
  }
};

export const interacoesApi = async () => {
  try {
    const response = await axios.get(
      "https://emilyspecht.github.io/the-cresim/interacoes.json"
    );
    return response.data;
  } catch {
  //  console.error("Ocorreu um error ao acessar a API de interações");
  }
};

export const cheatsApi = async () => {
  try {
    const response = await axios.get(
      "https://emilyspecht.github.io/the-cresim/cheats.json"
    );
    return response.data;
  } catch {
  //  console.error("Ocorreu um error ao acessar a API de cheats");
  }
};
