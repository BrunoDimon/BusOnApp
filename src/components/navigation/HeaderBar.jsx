import { Box, Heading, Pressable } from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default HeaderBar = ({ options, navigationDrawer }) => {
    const theme = useSelector(state => state.theme.theme);

    return (
        <Box $dark-bg={'$backgroundDark900'} $light-bg={'$white'} flex={0} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} px={20} py={12} gap={15} hardShadow='5' borderRadius={'$full'} mx={'$4'} my={'$2'}>
            <Pressable onPress={() => navigationDrawer.openDrawer()} >
                <MaterialCommunityIcons name={'menu'} size={30} color={theme === 'light' ? '#525252' : 'white'} />
            </Pressable>
            <Heading size={'xl'} $dark-color="$white" $light-color='#525252' maxFontSizeMultiplier={1.25} lineHeight={'$xl'}>{options.label}</Heading>

            {
                options.rigthButtonHeader
                    ?
                    (
                        <Pressable onPress={() => console.log('Botão Sync')} >
                            <MaterialCommunityIcons name={options.rigthButtonHeader} size={30} color={theme === 'light' ? '#525252' : 'white'} />
                        </Pressable>
                    )
                    :
                    (
                        <Box w={30}></Box>
                    )
            }

        </Box>
    )
}