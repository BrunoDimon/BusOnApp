import { api } from '../api';

export const buscarTodasAssociacoes = async (filtros) => {
    return request = await api.get('/associacao?filters=' + JSON.stringify(filtros));
};

export const buscarAssociacaoPorId = async (id) => {
    return request = await api.get('/associacao/' + String(id));
}
export const excluirAssociacao = async (id) => {
    return request = await api.delete('/associacao/' + String(id));
}

export const cadastrarAssociacao = async (data) => {
    return request = await api.post('/associacao', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const editarAssociacao = async (id, data) => {
    return request = await api.put('/associacao/' + String(id), data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}
