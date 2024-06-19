import { api } from '../api';

export const enviarMensagem = async (mensagem) => {
    try {
        return request = await api.post('/chatbot/conversation', { message: mensagem })
            .then(response => response.data.response.content);
    } catch (error) {
        console.log(error)
    }
};