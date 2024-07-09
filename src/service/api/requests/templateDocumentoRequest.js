import { api } from '../api';

export const buscarTodosTemplatesDocumentos = async (filtros) => {
    return request = await api.get('/template-documento?filters=' + JSON.stringify(filtros));
};

export const buscarTemplateDocumentoPorId = async (id) => {
    return request = await api.get('/template-documento/' + String(id));
}
export const excluirTemplateDocumento = async (id) => {
    return request = await api.delete('/template-documento/' + String(id));
}

export const cadastrarTemplateDocumento = async (data) => {
    return request = await api.post('/template-documento', data);
}

export const editarTemplateDocumento = async (id, data) => {
    return request = await api.put('/template-documento/' + String(id), data);
}
