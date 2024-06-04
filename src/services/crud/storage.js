import { useLocalStorage } from "../local-storage/use-local-storage.js";

export const updateStorage = (...newStorage) => {
  const localStorage = useLocalStorage();
  localStorage.setObject("personagensNoJogo.json", [...newStorage]);
};

export const updateStorageDead = (...newStorage) => {
  const localStorage = useLocalStorage();
  localStorage.setObject("personagensMortos.json", [...newStorage]);
};

export const getStorage = () => {
  const localStorage = useLocalStorage();
  const storage = localStorage.getObject("personagensNoJogo.json") || [];
  return storage;
};

export const getStorageDead = () => {
  const localStorage = useLocalStorage();
  const storage = localStorage.getObject("personagensMortos.json") || [];
  return storage;
};
