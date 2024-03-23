import { Box, Text } from "@gluestack-ui/themed"
import TabBarIcon from "./TabBarIcon"
import React, { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Keyboard, StyleSheet } from 'react-native';

const getKeyboardHeight = (event) => {
    return event.endCoordinates.height;
};

export default TabBar = ({ allRoutes, state, descriptors, navigation }) => {
    const isFocused = useIsFocused();
    const [keyboardHeight, setKeyboardHeight] = useState(0);

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

    // Verifica se a tabBar deve ser ocultada com base no foco e na altura do teclado
    const isTabBarVisible = isFocused && keyboardHeight === 0;

    if (!isTabBarVisible) {
        return null; // Oculta a tabBar se o teclado estiver ativo
    }


    return (
        <Box $dark-bg="$backgroundDark800" $light-bg="#f1f1f1" w={'$full'} h={85} >
            <Box $dark-bg="$backgroundDark900" $light-bg="$white" w={'$full'} hardShadow={'5'} h={85} borderTopEndRadius={35} borderTopStartRadius={35} flexDirection="row" justifyContent="space-between" overflow="hidden">
                {
                    state.routes.map((route, index) => {
                        const { options } = descriptors[route.key];
                        const isFocused = state.index === index;
                        const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        };
                        const routeValues = {
                            label: options.label || route.name,
                            iconName: options.iconName,
                            isMainRoute: options.isMainRoute,
                            visibleOnBottomTabNavigation: options.visibleOnBottomTabNavigation,
                            rigthButtonHeader: options.rigthButtonHeader,
                        }
                        if (!options.visibleOnBottomTabNavigation) {
                            return null;
                        }
                        return (
                            <TabBarIcon key={index} route={routeValues} focused={isFocused} onPress={onPress} index={index} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}