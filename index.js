import { startMenu, menuAcaoPersonagem } from "./interface/menus/menu.js";


const main = async () => {
  while (true) {
    const obj = await startMenu();
    if (obj == "exit") {
      return;
    }

    if (typeof obj == "object") {
      console.clear();
      await menuAcaoPersonagem(obj);
    }
  }
};

main();
