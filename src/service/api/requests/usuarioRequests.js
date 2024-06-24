import { api } from '../api';

export const buscarTodosUsuarios = async (filtros) => {
    return request = await api.get('/usuario?filters=' + JSON.stringify(filtros));
};

export const buscarUsuarioPorId = async (id) => {
    return request = await api.get('/usuario/' + String(id));
}
export const excluirUsuario = async (id) => {
    return request = await api.delete('/usuario/' + String(id));
}

export const cadastrarUsuario = async (data) => {
    return request = await api.post('/usuario', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const editarUsuario = async (id, data) => {
    return request = await api.put('/usuario/' + String(id), data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export const editarSenhaUsuario = async (id, data, jwtToken) => {
    return request = await api.put('/usuario/atualizar-senha/' + String(id), data, {
        headers: {
            Authorization: jwtToken
        }
    });
}