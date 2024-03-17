import Home from '../../screens/Home';
import { Box, Heading, Text } from '@gluestack-ui/themed';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Center } from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabBarIcon from './TabBarIcon';
import { useSelector } from 'react-redux';
import HistoricoPagamento from '../../screens/HistoricoPagamento';
import Mensalidade from '../../screens/Mensalidade';
import MeusDados from '../../screens/MeusDados';


const Tab = createBottomTabNavigator();

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
    }
]

export default function BottomTabNavigation() {
    const accessUser = useSelector(state => state.auth.user.acesso);
    const userRoutes = routes.filter(route => route.accessRequired.includes(accessUser))
    const initialRouteName = userRoutes.filter(route => route.isInitialRoute)[0]?.name
    return (
        <Tab.Navigator
            initialRouteName={initialRouteName}
            screenOptions={({ route }) => ({
                unmountOnBlur: true,
                tabBarIcon: ({ focused, color, size }) => <TabBarIcon allRoutes={routes} currentRoute={route} focused={focused} />,
                tabBarInactiveTintColor: 'gray',
                tabBarActiveTintColor: '#FFD34C',
                tabBarShowLabel: false,
                tabBarLabelStyle: {
                    fontSize: 10,
                },
                tabBarHideOnKeyboard: true,
                tabBarStyle: {

                    overflow: 'hidden',
                    /*                     bottom: 25,
                                        left: 15,
                                        right: 15, */
                    elevation: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 25,
                    height: 80,
                    ...styles.shadow
                },
                headerShown: true,
                header: (scene, previous, navigation) => {
                    return (
                        <Box bgColor={'#ffffff'} flex={0} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'} px={20} py={10} gap={15} my={15} mx={20} borderRadius={'$full'}>
                            {/*                <TouchableOpacity onPress={() => navigation.goBack()} >
                                <MaterialCommunityIcons name={'keyboard-backspace'} size={30} color={'#525252'} />
                            </TouchableOpacity> */}
                            <Heading size={'2xl'} color='#525252'>{scene.route.name}</Heading>
                        </Box>
                    )
                },

            })}>
            {
                userRoutes.map(route => (
                    <Tab.Screen key={route.name} name={route.name} component={route.component} />
                ))
            }
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadorColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }
})