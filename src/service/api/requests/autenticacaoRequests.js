import Toast from "react-native-root-toast";
import { login, logout, refreshUser, refreshToken } from "../../../store/authSlice";
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
        .catch(async (err) => {
            console.log(err.response.data);
            await api.post('/autenticacao/atualizar-token', { refreshToken: store.getState().auth.refreshToken })
                .then((response) => {
                    const dadosNovoToken = response.data;
                    store.dispatch(refreshToken({ token: dadosNovoToken.accessToken, refreshToken: dadosNovoToken.refreshToken }));
                    console.log('Token atualizado')
                }).catch((error) => {
                    console.log(error.response.data.error)
                    let toast = Toast.show('Login expirado, deslogando...', {
                        duration: Toast.durations.LONG,
                    });
                    setTimeout(function hideToast() {
                        Toast.hide(toast);
                    }, 5000);
                    store.dispatch(logout());
                })
        })
}