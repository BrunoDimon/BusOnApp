import { api } from '../api';

export const buscarTodosAlunos = async (filtros) => {
    return request = await api.get('/usuario?filters=' + JSON.stringify(filtros));
};

export const buscarAlunosPorId = async (id) => {
    return request = await api.get('/usuario/' + String(id));
}
export const excluirAlunos = async (id) => {
    return request = await api.delete('/usuario/' + String(id));
}

export const cadastrarAlunos = async (data) => {
    return request = await api.post('/usuario', data);
}

export const editarAlunos = async (id, data) => {
    return request = await api.put('/usuario/' + String(id), data);
}