import { Avatar, BadgeIcon, BadgeText, Box, Heading, ScrollView, Text, VStack, useColorMode } from "@gluestack-ui/themed";
import { useDispatch, useSelector } from "react-redux";
import routesMenu from "./routesMenu";

import { Badge, CheckCircleIcon, HStack, StatusBar } from "@gluestack-ui/themed";
import CardBox from "../../components/CardBox";
import Label from "../../components/Label";
import ButtonIconMenu from "./ButtonIconMenu";

export default Inicio = ({ navigation }) => {
    const dispatch = useDispatch();
    const userInfos = useSelector(state => state.auth.user);
    const userRoutes = routesMenu.map(category => {
        const filteredRoutes = category.routes.filter(route => route.accessRequired.includes(userInfos?.tipoAcesso));
        return {
            ...category,
            routes: filteredRoutes
        };
    }).filter(category => category.routes.length > 0);

    const colorMode = useColorMode();
    const logo = colorMode === "light" ? require('../../../assets/busOnFontePreta.png') : require('../../../assets/busOnFonteBranca.png');
    const draw = require('../../../assets/school-bus-predios-dark.png');

    return (
        <Box flex={1}>
            <StatusBar translucent={true} backgroundColor={'#FFC100'} barStyle={'light-content'} /* barStyle={theme == 'dark' ? 'light-content' : 'dark-content'} */ />
            <Box py={25} pb={85} px={12} bg={'$yellow500'}>
                <HStack alignItems="center" gap={12}>
                    <Avatar bg={'$yellow600'} size={'xl'}></Avatar>
                    <VStack flex={1}>
                        <HStack justifyContent="space-between" alignItems="center" gap={10}>
                            <Heading color={'$white'} flex={1} numberOfLines={1} size={'lg'} >{userInfos?.nome}</Heading>
                            <Box alignSelf="flex-end">
                                <Badge justifyContent="center" size="lg" py={5} variant="solid" bg={'$yellow200'} ml="$1">
                                    <BadgeText color={'$yellow600'}>{userInfos?.tipoAcesso}</BadgeText>
                                    <BadgeIcon color={'$yellow600'} as={CheckCircleIcon} ml="$1" />
                                </Badge>
                            </Box>
                        </HStack>
                        <Text color={'$white'}>UNISL</Text>
                        <Text color={'$white'}>Engenharia de Software - UNISATC</Text>
                    </VStack>
                </HStack>
            </Box>
            <ScrollView mt={-65} onScroll={(v) => console.log(v.nativeEvent.contentOffset.y)}>
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