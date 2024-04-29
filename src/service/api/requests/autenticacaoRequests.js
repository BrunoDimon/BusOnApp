import { login, logout } from "../../../store/authSlice";
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
            console.log(response.data.message)
        })
        .catch(error => {
            store.dispatch(logout());
            alert('Login expirado, deslogando...')
        })
}