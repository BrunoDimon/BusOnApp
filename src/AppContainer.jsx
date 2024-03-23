import { useState, useEffect } from 'react';
//import { config } from '@gluestack-ui/config';
import { config } from '../config/gluestack-ui.config';
import { Button, ButtonText, Box, Text, GluestackUIProvider, Switch } from '@gluestack-ui/themed';
import Login from './screens/Login';
import DrawerNavigation from './components/navigation/DrawerNavigation';
import BottomTabNavigation from './components/navigation/BottomTabNavigation';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, useColorScheme, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

export default function AppContainer() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const theme = useSelector(state => state.theme.theme);
    return (
        <GluestackUIProvider colorMode={theme} config={config}  >
            <StatusBar backgroundColor={theme == 'dark' ? '#000000' : '#ffffff'} barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} />
            <NavigationContainer >
                {isAuthenticated ? <DrawerNavigation /> : <Login />}
            </NavigationContainer>
        </GluestackUIProvider >
    );
}




