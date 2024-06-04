import { tomarBanho } from "../../src/requisitos/tomarbanho.js";

export const menuBanho = async (personagem) => {
    await tomarBanho(personagem);

    return personagem;
}