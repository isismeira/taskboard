import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000"
});

// Exemplo de requisição correta
export const getAllNotes = async () => {
    return await api.get("/api/annotations");
};

export default api;
