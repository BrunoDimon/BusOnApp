import { login, logout, refreshUser } from "../../../store/authSlice";
import { store } from "../../../store/storeConfig";
import { api } from "../api";

export const loginRequest = async (email, senha) => {
    const data = {
        email, senha
    }
    return request = await api.post('/autenticacao/autenticar', data);
}




export const validateToken = async () => {
    await api.post('/autenticacao/validar-token')
        .then(response => {
            const dadosUsuario = response.data.user
            store.dispatch(refreshUser(dadosUsuario));
        })
        .catch(error => {
            store.dispatch(logout());
            alert('Login expirado, deslogando...')
        })
}