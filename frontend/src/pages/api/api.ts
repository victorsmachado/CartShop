import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    // Adicionar cabeçalhos, autenticação, etc. antes de enviar a solicitação
    return config;
  },
  (error) => {
    // Tratar erros de solicitação aqui
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Tratar respostas bem-sucedidas aqui
    return response;
  },
  (error) => {
    // Tratar erros de resposta aqui
    return Promise.reject(error);
  }
);

export default api;
