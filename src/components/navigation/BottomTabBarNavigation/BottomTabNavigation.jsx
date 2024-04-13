import { Box, Heading, Text } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import routes from '../../../routes/routes';
import TabBar from './TabBar';
import HeaderBar from '../HeaderBar';


const Tab = createBottomTabNavigator();


export default function BottomTabNavigation({ navigation: navigationDrawer }) {
    const accessUser = useSelector(state => state.auth.user.tipoAcesso);
    const userRoutes = routes.filter(route => route.accessRequired.includes(accessUser))
    const initialRouteName = userRoutes.filter(route => route.isInitialRoute)[0]?.name
    const theme = useSelector(state => state.theme.theme);

    return (
        <Tab.Navigator
            initialRouteName={initialRouteName}
            tabBar={props => <TabBar {...props} />}
            sceneContainerStyle={{
                backgroundColor: theme === 'light' ? '#f1f1f1' : '#404040'
            }}
            screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true,
                headerShown: true,
                header: (props) => <HeaderBar {...props} navigationDrawer={navigationDrawer} />
            })}>
            {
                userRoutes.map((route, index) => (
                    <Tab.Screen
                        key={index}
                        name={route.name}
                        component={route.component}
                        options={{
                            iconName: route.iconName,
                            isMainRoute: route.isMainRoute,
                            visibleOnBottomTabNavigation: route.visibleOnBottomTabNavigation,
                            label: route.label,
                            rigthButtonHeader: route.rigthButtonHeader,
                        }}
                    />
                ))
            }
        </Tab.Navigator>

    );
}