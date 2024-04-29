import { Box, Heading, ScrollView, useColorMode, Text } from "@gluestack-ui/themed"
import { useDispatch, useSelector } from "react-redux";
import routesMenu from "./routesMenu";

import CardBox from "../../components/CardBox";
import Label from "../../components/Label";
import ButtonIconMenu from "./ButtonIconMenu";
import { Image } from "@gluestack-ui/themed";
import { Center } from "@gluestack-ui/themed";

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
            <Box my={25} justifyContent="center" bgColor="transparent">
                <Box alignItems='center' justifyContent='flex-end'>
                    <Image
                        w={'70%'}
                        source={logo}
                        alt='Logo'
                    />
                </Box>
            </Box >
            <Center my={10}>
                <Text>Texto Temporário</Text>
                <Heading>{userInfos?.tipoAcesso}</Heading>
            </Center>
            <ScrollView>
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