import React, { useContext, useState, useEffect } from 'react';

import { Text, Box, Switch, useColorMode, useTheme } from "@gluestack-ui/themed";
import { TouchableOpacity, ImageBackground, Image, Appearance, useColorScheme, setColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from 'react-redux';
import ThemeToggle from '../../ThemeToggle';
import { logout } from '../../../store/authSlice';
import { useSelector } from 'react-redux';
import TipoAcessoUsuarioEnum from '../../../enums/TipoAcessoUsuarioEnum';

export default function SideBar(props) {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme);
    const userInfos = useSelector(state => state.auth.user);

    const colorMode = useColorMode();
    return (
        <Box flex={1} sx={{ _dark: { bg: '$secondary900', }, _light: { bg: '$light200', }, }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: (theme === "light" ? "#e7e5e4" : "#171717") }}>
                <Box flex={1} >
                    <ImageBackground source={require('../../../../assets/background-drawer.png')} style={{ padding: 40, alignItems: 'center', }}>
                        <Image source={require('../../../../assets/userProfile.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                        <Text fontSize={22} color={'white'}>{userInfos.nome + " " + userInfos.sobrenome}</Text>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
                            <Ionicons name="laptop-outline" size={13} color="#fff"></Ionicons>
                            <Text style={{ color: '#fff', fontSize: 13, paddingStart: 5 }}>{TipoAcessoUsuarioEnum[userInfos.tipoAcesso]}</Text>
                        </Box>
                    </ImageBackground>
                    <Box flex={1} sx={{ _light: { bg: '$light200' }, _dark: { bg: '$secondary900' } }} pt={5} >
                        <DrawerItemList {...props} />
                    </Box>
                </Box>
            </DrawerContentScrollView >
            <Box px={20} py={8} borderTopWidth={1} borderTopColor={'#CCC'} flexDirection={'row'}  >
                <TouchableOpacity onPress={() => dispatch(logout())} style={{ paddingVertical: 15, width: '80%' }}>
                    <Box flexDirection='row' alignItems='center'>
                        <Ionicons name="exit-outline" size={22} color={(theme === 'light' ? 'black' : '#fff')} />
                        <Text fontSize={15} marginLeft={10} sx={{ _light: { color: '$textDark900' }, _dark: { color: '$textDark200' } }}>Sair</Text>
                    </Box>
                </TouchableOpacity>
                <ThemeToggle />
            </Box>
        </Box >
    );
}