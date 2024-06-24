import { Box, Text } from "@gluestack-ui/themed"
import TabBarIcon from "./TabBarIcon"
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Keyboard, StyleSheet } from 'react-native';
import routesTabBar from "./routesTabBar";
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';


const getKeyboardHeight = (event) => {
    return event.endCoordinates.height;
};

export default TabBar = ({ state, navigation, descriptors }) => {
    const isFocused = useIsFocused();
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const routes = routesTabBar.filter(v => v.tipoAcesso === useSelector(state => state.auth?.user?.tipoAcesso))

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setKeyboardHeight(getKeyboardHeight(event));
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    let hideTabBar = false;

    state.routes?.map((route, index) => {
        const { options } = descriptors[route.key];

        if (state.index == index && options.hideTabBar) {
            hideTabBar = true;
        }
    })
    // Verifica se a tabBar deve ser ocultada com base no foco e na altura do teclado
    const isTabBarVisible = (isFocused && keyboardHeight === 0);

    if (!isTabBarVisible || hideTabBar) {
        return null; // Oculta a tabBar se o teclado estiver ativo
    }

    return (
        <Box $dark-bg="$backgroundDark950" $light-bg="#f1f1f1" w={'$full'} h={85}>
            <Box $dark-bg="$backgroundDark900" $light-bg="$white" w={'$full'} hardShadow={'5'} h={85} borderTopEndRadius={35} borderTopStartRadius={35} flexDirection="row" justifyContent="space-between" overflow="hidden">
                {
                    routes[0].routes?.map((route, index) => {
                        const isFocusedRoute = state.routes[state.index].name === route.name;
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.name,
                                canPreventDefault: true,
                            });

                            if (!isFocusedRoute && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };
                        const routeValues = {
                            label: route.label || route.name,
                            iconName: route.iconName,
                            isMainRoute: route.isMainRoute
                        }

                        return (
                            <TabBarIcon key={index} route={routeValues} focused={isFocusedRoute} onPress={onPress} index={index} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}