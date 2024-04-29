import { useState, useEffect } from 'react';
//import { config } from '@gluestack-ui/config';
import { config } from '../config/gluestack-ui.config';
import { Button, ButtonText, Box, StatusBar, GluestackUIProvider, Switch } from '@gluestack-ui/themed';
import Login from './screens/Login/Login';
import DrawerNavigation from './components/navigation/DrawerNavigation/DrawerNavigation';
import BottomTabNavigation from './components/navigation/BottomTabBarNavigation/BottomTabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { DialogProvider } from './components/dialog/DialogContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { validateToken } from './service/api/requests/autenticacaoRequests';
import { ToastProvider, Toast } from 'react-native-toast-notifications'
import ToastAlert from './components/toasts/ToastAlert';

export default function AppContainer({ navigation }) {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const theme = useSelector(state => state.theme.theme);

    useEffect(() => {
        console.log('Inciou aplicação')
        const validarTokenAcessoAtual = async () => {
            if (isAuthenticated) {
                await validateToken();
            }
        }
        validarTokenAcessoAtual();
    }, [])
    return (
        <GluestackUIProvider colorMode={theme} config={config}  >
            <SafeAreaView flex={1} backgroundColor={theme == 'dark' ? '#404040' : '#F1F1F1'}>
                <ToastProvider placement="top" renderToast={(toast) => <ToastAlert toastId={toast.id} titulo={toast.message} descricao={toast.data.messageDescription} tipo={toast.type} toastClose={() => Toast.hide(toast.id)} />} >
                    <DialogProvider>
                        <NavigationContainer >
                            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
                            {isAuthenticated ? <DrawerNavigation /> : <Login />}
                        </NavigationContainer>
                    </DialogProvider>
                </ToastProvider>
            </SafeAreaView>
        </GluestackUIProvider >
    );
}




