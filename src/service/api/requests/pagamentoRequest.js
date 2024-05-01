import { api } from '../api';

export const buscarTodosPagamentos = async (filtros, filtrosAssociacao) => {
    return request = await api.get('/pagamento?filters=' + JSON.stringify(filtros) + '&filtersAssociacao=' + JSON.stringify(filtrosAssociacao));
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
