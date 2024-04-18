import { api } from '../api';

export const buscarTodosUsuarios = async (filtros) => {
    return request = await api.get('/usuarios?filters=' + JSON.stringify(filtros));
};

export const buscarUsuarioPorId = async (id) => {
    return request = await api.get('/usuarios/' + String(id));
}
export const excluirUsuario = async (id) => {
    return request = await api.delete('/usuarios/' + String(id));
}

export const cadastrarUsuario = async (data) => {
    return request = await api.post('/usuarios', data);
}

export const editarUsuario = async (id, data) => {
    return request = await api.put('/usuarios/' + String(id), data);
}
