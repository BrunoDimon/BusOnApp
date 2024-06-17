import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACK_END_API_URL,
    paramsSerializer: {
        indexes: null
    },
})

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.request && !error.response) {
            Toast.show("Erro no servidor", { data: { messageDescription: 'Nenhuma resposta recebida. Tente novamente mais tarde ou contate o administrador.' }, type: 'error' })
            console.error('Erro na requisição: Nenhuma resposta recebida', error.request);
        }
        return Promise.reject(error);
    }
);

export {
    api
}