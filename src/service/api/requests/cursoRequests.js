import { api } from '../api';

export const buscarTodosCursos = async (filtros) => {
    return request = await api.get('/curso?filters=' + JSON.stringify(filtros));
};

export const buscarCursoPorId = async (id) => {
    return request = await api.get('/curso/' + String(id));
}
export const excluirCurso = async (id) => {
    return request = await api.delete('/curso/' + String(id));
}

export const cadastrarCurso = async (data) => {
    return request = await api.post('/curso', data);
}

export const editarCurso = async (id, data) => {
    return request = await api.put('/curso/' + String(id), data);
}
