import { api } from '../api';

export const buscarTodosAlunos = async (filtros) => {
    return request = await api.get('/alunos?filters=' + JSON.stringify(filtros));
};

export const buscarAlunosPorId = async (id) => {
    return request = await api.get('/alunos/' + String(id));
}
export const excluirAlunos = async (id) => {
    return request = await api.delete('/alunos/' + String(id));
}

export const cadastrarAlunos = async (data) => {
    return request = await api.post('/alunos', data);
}

export const editarAlunos = async (id, data) => {
    return request = await api.put('/alunos/' + String(id), data);
}