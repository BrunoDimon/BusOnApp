import { useState, useEffect } from 'react';
//import { config } from '@gluestack-ui/config';
import { config } from '../config/gluestack-ui.config';
import { Button, ButtonText, Box, Text, GluestackUIProvider, Switch } from '@gluestack-ui/themed';
import Login from './screens/Login/Login';
import DrawerNavigation from './components/navigation/DrawerNavigation/DrawerNavigation';
import BottomTabNavigation from './components/navigation/BottomTabBarNavigation/BottomTabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { DialogProvider } from './components/dialog/DialogContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppContainer() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const theme = useSelector(state => state.theme.theme);
    return (
        <GluestackUIProvider colorMode={theme} config={config}  >
            <SafeAreaView flex={1}>
                <StatusBar translucent={true} backgroundColor={theme === 'light' ? 'transparent' : '#404040'} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
                <DialogProvider>
                    <NavigationContainer >
                        {isAuthenticated ? <DrawerNavigation /> : <Login />}
                    </NavigationContainer>
                </DialogProvider>
            </SafeAreaView>
        </GluestackUIProvider >
    );
}




