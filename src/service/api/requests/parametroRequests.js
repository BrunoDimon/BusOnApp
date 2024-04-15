import { api } from '../api';

export const buscarTodosParametros = async (filtros) => {
    return request = await api.get('/parametro?filters=' + JSON.stringify(filtros));
};

export const buscarParametroPorId = async (id) => {
    return request = await api.get('/parametro/' + String(id));
}

export const buscarParametroDaAssociacao = async (id) => {
    return request = await api.get('/parametro/associacao/' + String(id));
}

export const cadastrarParametro = async (data) => {
    return request = await api.post('/parametro', data);
}

export const editarParametro = async (id, data) => {
    return request = await api.put('/parametro/' + String(id), data);
}
