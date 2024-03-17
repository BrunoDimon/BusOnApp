import React from 'react';

import { Text, Box, useColorMode, useTheme } from "@gluestack-ui/themed";
import SideBar from "./SideBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
    const colorMode = useColorMode()
    return (
        <Box flex={1} sx={{ _dark: { bg: '$red300', }, _light: { bg: '$red400', } }}>

            <Drawer.Navigator
                drawerContent={(props) => <SideBar {...props} />}
                screenOptions={{
                    headerShown: true,
                    headerTintColor: (colorMode === "light" ? '#010101' : '#f1f1f1'),
                    headerStyle: {
                        backgroundColor: (colorMode === "light" ? '#FFFFFF' : '#262626'),
                    },
                    drawerActiveBackgroundColor: "#facc15",
                    drawerActiveTintColor: '#FFF',
                    drawerInactiveTintColor: (colorMode === "light" ? '#d7dbdd' : '#445460'),
                    LabelStyle: {
                        marginLeft: -25, fontSize: 15, color: (colorMode === "light" ? 'white' : 'black')
                    },
                    sceneContainerStyle: {
                        backgroundColor: (colorMode === "light" ? '#F1F1F1' : '#262626')
                    }
                }}
                initialRouteName="Tela" >
                <Drawer.Screen name="Tela Inicial" component={Home} options={{ drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
                {/*             <Drawer.Screen name="Cadastro de Livros" component={RegisterBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="book-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Visualização de Livros" component={ViewBooksScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="library-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Usuários" component={RegUserScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="person-add-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Lista de Usuários" component={ViewUsersScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} /> }} />
            <Drawer.Screen name="Cadastro de Empréstimos" component={RegReservesScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="cart-outline" size={22} color={color} /> }} />
        <Drawer.Screen name="Visualização de Empréstimos" component={ViewReservesScreen} options={{ drawerIcon: ({ color }) => <Ionicons name="pricetags-outline" size={22} color={color} /> }} /> */}
            </Drawer.Navigator >
        </Box>
    );
}