import Home from '../../screens/Home';
import { Box, Heading, Text } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
<<<<<<< HEAD
import routes from '../../routes/routes';
import TabBar from './TabBar';
import HeaderBar from './HeaderBar';
=======
import HistoricoPagamento from '../../screens/HistoricoPagamento/HistoricoPagamento';
import Mensalidade from '../../screens/Mensalidade';
import MeusDados from '../../screens/MeusDados';
import Alunos from '../../screens/Alunos/Alunos';
>>>>>>> e34f4df2f9f8e3874f0f3dc78a0a1758e65b7ad6


const Tab = createBottomTabNavigator();

<<<<<<< HEAD
=======
const routes = [
    {
        name: 'Histórico Pagamentos',
        iconName: 'clipboard-text-clock-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: false,
        component: HistoricoPagamento
    },
    {
        name: 'Mensalidade',
        iconName: 'currency-usd',
        isMainRoute: true,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: true,
        component: Mensalidade
    },
    {
        name: 'Meus Dados',
        iconName: 'card-account-details-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_ALUNO'],
        isInitialRoute: false,
        component: MeusDados
    },
    {
        name: 'Configurações',
        iconName: 'cog-outline',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: false,
        component: MeusDados
    },
    {
        name: 'Pagamentos',
        iconName: 'credit-card-check-outline',
        isMainRoute: true,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: true,
        component: HistoricoPagamento
    },
    {
        name: 'Alunos',
        iconName: 'account-group',
        isMainRoute: false,
        visibleOnBottomTabNavigation: true,
        accessRequired: ['ACESSO_GESTAO'],
        isInitialRoute: false,
        component: Alunos
    },
]
>>>>>>> e34f4df2f9f8e3874f0f3dc78a0a1758e65b7ad6

export default function BottomTabNavigation({ navigation: navigationDrawer }) {
    const accessUser = useSelector(state => state.auth.user.acesso);
    const userRoutes = routes.filter(route => route.accessRequired.includes(accessUser))
    const initialRouteName = userRoutes.filter(route => route.isInitialRoute)[0]?.name
    const theme = useSelector(state => state.theme.theme);

    return (
        <Tab.Navigator
            initialRouteName={initialRouteName}
            tabBar={props => <TabBar allRoutes={userRoutes} {...props} />}
            sceneContainerStyle={{
                backgroundColor: theme === 'light' ? '#f1f1f1' : '#404040'
            }}
            screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarHideOnKeyboard: true,
<<<<<<< HEAD
=======
                tabBarStyle: {

                    overflow: 'hidden',
                    /*                     bottom: 25,
                                        left: 15,
                                        right: 15, */
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    // borderRadius: 25,
                    height: 80,
                    ...styles.shadow
                },
>>>>>>> e34f4df2f9f8e3874f0f3dc78a0a1758e65b7ad6
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