import { Avatar, AvatarFallbackText, AvatarImage, BadgeIcon, BadgeText, Box, Heading, ScrollView, Text, VStack, useColorMode } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import routesMenu from "./routesMenu";

import { Badge, CheckCircleIcon, HStack, StatusBar } from "@gluestack-ui/themed";
import CardBox from "../../components/CardBox";
import Label from "../../components/Label";
import ButtonIconMenu from "./ButtonIconMenu";
import { store } from "../../store/storeConfig";
import { setTheme } from '../../store/themeSlice';

import ButtonDotsDropdownMenu from "../../components/buttons/ButtonDotsDropdownMenu";
import { logout } from "../../store/authSlice";
import { useState } from "react";
import { RedefinirSenha } from "../Login/RedefinirSenha";
import { logoutRequest } from "../../service/api/requests/autenticacaoRequests";

export default Inicio = ({ navigation }) => {
    const dispatch = useDispatch();
    const userInfos = useSelector(state => state.auth.user);
    const userToken = useSelector(state => state.auth.token);
    const [isOpenRedefinirSenha, setIsOpenRedefinirSenha] = useState(false)
    const userRoutes = routesMenu.map(category => {
        const filteredRoutes = category.routes.filter(route => route.accessRequired.includes(userInfos?.tipoAcesso));
        return {
            ...category,
            routes: filteredRoutes
        };
    }).filter(category => category.routes.length > 0);

    const colorMode = useColorMode();
    const theme = useSelector(state => state.theme.theme);

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    return (
        <Box flex={1}>
            <StatusBar translucent={true} backgroundColor={'#FFC100'} barStyle={'light-content'} /* barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} */ />
            {
                isOpenRedefinirSenha &&
                <RedefinirSenha onClose={() => setIsOpenRedefinirSenha(false)} eExigeTrocarSenha={false} onConfirmChangePassword={() => { null }} dadosEdicao={{ id: userInfos.id }} jwtToken={userToken} />
            }
            <Box py={25} pb={85} px={12} bg={'$yellow500'}>
                <HStack alignItems="center" gap={12}>
                    <Avatar bg={'$yellow600'} size={'xl'}>
                        {
                            userInfos?.fotoUrl ?
                                (<AvatarImage source={process.env.EXPO_PUBLIC_FILES_API_URL + userInfos?.fotoUrl} alt={'foto'} />)
                                :
                                (<AvatarFallbackText>{userInfos?.nome}</AvatarFallbackText>)
                        }
                    </Avatar>
                    <VStack flex={1}>
                        <HStack flex={1} justifyContent="flex-start" alignItems="center" gap={10}>
                            <VStack flex={1} gap={5}>
                                <HStack flex={0}>
                                    <Heading color={'$white'} flex={1} numberOfLines={1} size={'lg'} fontWeight={'$bold'} textAlignVertical="bottom" >{userInfos?.nome}</Heading>
                                    <Box flex={0} ml={10}  >
                                        <ButtonDotsDropdownMenu dotsColor={'white'} opcoesMenu={[
                                            {
                                                onPress: () => handleThemeToggle(),
                                                nomeIcone: 'theme-light-dark',
                                                corIcone: '#FFC100',
                                                label: 'Alterar Tema'
                                            },
                                            {
                                                onPress: () => setIsOpenRedefinirSenha(true),
                                                nomeIcone: 'lock-reset',
                                                corIcone: '#FFC100',
                                                label: 'Redefinir Senha'
                                            },
                                            {
                                                onPress: () => logoutRequest(),
                                                nomeIcone: 'exit-to-app',
                                                corIcone: '#FFC100',
                                                label: 'Sair'
                                            },

                                        ]} />
                                    </Box>
                                </HStack>
                                <VStack flex={1} gap={5}>
                                    <HStack alignItens="center" justifyContent="center" mt={5}>
                                        <Text flex={1} fontSize={'$lg'} fontWeight={'$semibold'} textAlignVertical="bottom" numberOfLines={1} color={'$white'}>{userInfos?.associacaoSigla}</Text>
                                        <Box flex={0} ml={10}>
                                            <Badge justifyContent="center" size="lg" py={5} variant="solid" bg={'$yellow200'}>
                                                <BadgeText color={'$yellow600'}>{userInfos?.tipoAcesso}</BadgeText>
                                                <BadgeIcon color={'$yellow600'} as={CheckCircleIcon} ml="$1" />
                                            </Badge>
                                        </Box>
                                    </HStack>
                                    <Text flex={1} numberOfLines={1} color={'$white'}>{userInfos?.cursoNome && `${userInfos?.cursoNome} - ${userInfos?.instituicaoNome}`}</Text>
                                </VStack>
                            </VStack>
                        </HStack>
                    </VStack>

                </HStack>
            </Box>
            <ScrollView mt={-65} >
                <Box gap={15} pb={20}>
                    {
                        userRoutes.map((category, indexCategory) => (
                            <Box key={indexCategory}>
                                <Label ml={20} label={category.category} maxFontSizeMultiplier={1} />
                                <CardBox flexDirection={'col'} mx={20}>
                                    <Box flexDirection="row" flexWrap="wrap" rowGap={25}>
                                        {
                                            category.routes.map((route, indexRoute) => (
                                                <ButtonIconMenu key={indexRoute} route={route} onPress={() => navigation.navigate(route.name)} />
                                            ))
                                        }
                                    </Box>
                                </CardBox>
                            </Box>

                        ))
                    }
                </Box>
            </ScrollView>
        </Box>
    )
}