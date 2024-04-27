import { login, logout } from "../../../store/authSlice";
import { store } from "../../../store/storeConfig";
import { api } from "../api";

export const loginRequest = async (email, senha) => {
    const data = {
        email, senha
    }
    console.log('data', data)
    await api.post('/autenticacao/autenticar', data)
        .then(response => {
            console.log(response.data)
            const dadosUsuario = {
                user: {
                    id: response.data.id,
                    nome: response.data.nome,
                    email: response.data.email,
                    telefone: response.data.telefone,
                    endereco: response.data.endereco,
                    cursoId: response.data.cursoId,
                    associacaoId: response.data.associacaoId,
                    tipoAcesso: response.data.tipoAcesso,
                    situacao: response.data.situacao
                },
                token: response.data.accessToken,
                refreshToken: response.data.refreshToken
            };
            store.dispatch(login(dadosUsuario));
        })
        .catch(error => {
            throw error
        })
}




export const validateToken = async () => {
    await api.post('/autenticacao/validar-token')
        .then(response => {
            console.log(response.data.message)
        })
        .catch(error => {
            store.dispatch(logout());
            alert('Login expirado, deslogando...')
        })
}