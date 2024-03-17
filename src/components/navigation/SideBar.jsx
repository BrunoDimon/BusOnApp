import React, { useContext, useState, useEffect } from 'react';

import { Text, Box, Switch, useColorMode, useTheme } from "@gluestack-ui/themed";
import { TouchableOpacity, ImageBackground, Image, Appearance, useColorScheme, setColorScheme } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch } from 'react-redux';
import ThemeToggle from '../ThemeToggle';
import { logout } from '../../store/authSlice';

export default function SideBar(props) {
    const dispatch = useDispatch();
    const colorMode = useColorMode();

    return (
        <Box flex={1} sx={{ _dark: { bg: '$secondary900', }, _light: { bg: '$light200', }, }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: (colorMode === "light" ? "#e7e5e4" : "#171717") }}>
                <Box flex={1} >
                    <ImageBackground source={require('../../../assets/background-drawer.png')} style={{ padding: 40, alignItems: 'center', }}>
                        <Image source={require('../../../assets/userProfile.png')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
                        <Text fontSize={22} color={'white'}>Douglas</Text>
                        <Box style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4 }}>
                            <Ionicons name="laptop-outline" size={13} color="#fff"></Ionicons>
                            <Text style={{ color: '#fff', fontSize: 13, paddingStart: 5 }}>Administrador</Text>
                        </Box>
                    </ImageBackground>
                    <Box flex={1} _light={{ bgColor: 'white' }} _dark={{ bgColor: 'dark.100' }} pt={5} >
                        <DrawerItemList {...props} />
                    </Box>
                </Box>
            </DrawerContentScrollView >
            <Box px={20} py={8} borderTopWidth={1} borderTopColor={'#CCC'} flexDirection={'row'} >
                <TouchableOpacity onPress={() => dispatch(logout())} style={{ paddingVertical: 15, width: '80%' }}>
                    <Box style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="exit-outline" size={22} color={(colorMode === 'light' ? 'black' : 'white')} />
                        <Text fontSize={15} marginLeft={5} _light={{ color: 'dark.200' }} _dark={{ color: 'gray.200' }}>Sair</Text>
                    </Box>
                </TouchableOpacity>
                <ThemeToggle />
            </Box>
        </Box >
    );
}