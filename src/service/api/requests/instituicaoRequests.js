import { api } from '../api';

export const buscarTodasInstituicoes = async (filtros) => {
    return request = await api.get('/instituicao?filters=' + JSON.stringify(filtros));
};

export const buscarInstituicaoPorId = async (id) => {
    return request = await api.get('/instituicao/' + String(id));
}
export const excluirInstituicao = async (id) => {
    return request = await api.delete('/instituicao/' + String(id));
}

export const cadastrarInstituicao = async (data) => {
    return request = await api.post('/instituicao', data);
}

export const editarInstituicao = async (id, data) => {
    return request = await api.put('/instituicao/' + String(id), data);
}
