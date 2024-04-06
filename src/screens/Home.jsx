import { Center, Heading, Image, useColorMode } from "@gluestack-ui/themed";
import { Text, Box } from "@gluestack-ui/themed";

export default function Home() {
    const colorMode = useColorMode();
    const logo = colorMode === "light" ? require('../../assets/busOnFontePreta.png') : require('../../assets/busOnFonteBranca.png');
    const draw = require('../../assets/school-bus-predios-dark.png');

    return (
        <Box flex={1} justifyContent="center" bgColor="transparent">
            <Box flex={0.5} alignItems='center' justifyContent='flex-end'>
                <Image
                    w={'70%'}
                    source={logo}
                    alt='Logo'
                />
            </Box>
            <Center flex={1}>
                <Image
                    h={'75%'}
                    w={'75%'}
                    resizeMode='contain'
                    source={draw}
                    alt='SubLogo'
                />
            </Center>
        </Box >
    )
}