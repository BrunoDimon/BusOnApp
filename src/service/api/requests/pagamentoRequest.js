import { api } from '../api';

export const buscarTodosPagamentos = async () => {
    const request = await api.get('/pagamento', {
    }).then(response => {
        return response
    }).catch(error => {
        throw error
    });
    return await request.data;

};

export const buscarPagamentoPorId = async (id) => {
    return request = await api.get('/pagamento/' + String(id));
}
export const excluirPagamento = async (id) => {
    return request = await api.delete('/pagamento/' + String(id));
}

export const cadastrarPagamento = async (data) => {
    return request = await api.post('/pagamento', data);
}

export const editarPagamento = async (id, data) => {
    return request = await api.put('/pagamento/' + String(id), data);
}
