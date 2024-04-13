import React from 'react';

import { Text, Box, useColorMode, useTheme } from "@gluestack-ui/themed";
import SideBar from "./SideBar";
import Ionicons from "react-native-vector-icons/Ionicons";
import Login from '../../../screens/Login/Login';
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabNavigation from '../BottomTabBarNavigation/BottomTabNavigation';
import { useSelector } from 'react-redux';
import IaChat from '../../../screens/IaChat';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
export default function DrawerNavigation() {
    const theme = useSelector(state => state.theme.theme);

    return (
        <Box flex={1} sx={{ _dark: { bg: '$red300', }, _light: { bg: '$red400', } }}>

            <Drawer.Navigator
                drawerContent={(props) => <SideBar {...props} />}
                screenOptions={{
                    headerShown: false,

                    drawerInactiveBackgroundColor: "#facc15",
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: (theme === "light" ? '#d7dbdd' : '#445460'),
                    LabelStyle: {
                        marginLeft: -25, fontSize: 15, color: (theme === "light" ? 'white' : 'black')
                    },
                    sceneContainerStyle: {
                        backgroundColor: (theme === "light" ? '#F1F1F1' : '#262626')
                    }
                }}
                initialRouteName="BottomTabNavigation" >
                <Drawer.Screen name="BottomTabNavigation" component={BottomTabNavigation} options={{ drawerType: 'front', drawerItemStyle: { display: 'none' }, drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} /> }} />
            </Drawer.Navigator >
        </Box>
    );
}