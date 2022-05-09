import axios from "axios";

/**
 * Dica: usar o IP da máquina, pois o Expo não interpreta o localhost
 */
export const api = axios.create({
  baseURL: "http://192.168.1.18:3333",
});
