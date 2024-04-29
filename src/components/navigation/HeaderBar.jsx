import { Box, Heading, Pressable } from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
export default HeaderBar = ({ options, navigationDrawer }) => {
    const theme = useSelector(state => state.theme.theme);
    const rotaAtual = useRoute();
    const eRotaInicio = rotaAtual.name == 'inicio';
    return (
        <Box flex={0} bg={eRotaInicio ? '$yellow500' : 'transparent'}>
            <Box $dark-bg={eRotaInicio ? 'transparent' : '$backgroundDark900'} $light-bg={eRotaInicio ? 'transparent' : '$white'} flex={0} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} px={20} py={12} gap={15} hardShadow={rotaAtual.name != 'inicio' && '5'} borderRadius={'$full'} mx={'$4'} my={'$2'}>
                <Pressable onPress={() => navigationDrawer.openDrawer()} >
                    <MaterialCommunityIcons name={'menu'} size={30} color={eRotaInicio ? 'white' : theme === 'light' ? '#525252' : 'white'} />
                </Pressable>
                <Heading size={'xl'} $dark-color={"$white"} $light-color={eRotaInicio ? 'white' : '#525252'} maxFontSizeMultiplier={1.25} lineHeight={'$xl'}>{options.label}</Heading>

                {
                    options.rigthButtonHeader
                        ?
                        (
                            <Pressable onPress={() => options.onRightButtonPress} >
                                <MaterialCommunityIcons name={options.rigthButtonHeader} size={30} color={eRotaInicio ? 'white' : theme === 'light' ? '#525252' : 'white'} />
                            </Pressable>
                        )
                        :
                        (
                            <Box w={30}></Box>
                        )
                }

            </Box>
        </Box>

    )
}