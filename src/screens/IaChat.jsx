import { Box, Heading, Pressable, Text } from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default IaChat = () => {
    const theme = useSelector(state => state.theme.theme);
    return (
        <Box>
            <Box $dark-bg={'$backgroundDark900'} $light-bg={'$white'} flex={0} flexDirection={'row'} alignItems={'center'} justifyContent={'start'} px={20} py={12} gap={15} hardShadow='5' borderRadius={'$full'} mx={'$4'} my={'$2'}>
                <Pressable>
                    <MaterialCommunityIcons name={'keyboard-backspace'} size={30} color={theme === 'light' ? '#525252' : 'white'} />
                </Pressable>
                <Heading size={'xl'} $dark-color="$white" $light-color='#525252' maxFontSizeMultiplier={1.25} lineHeight={'$xl'}>IA Chat</Heading>
            </Box>
            <Box $dark-bg={'$backgroundDark900'} $light-bg={'$white'} height={660} alignItems={'center'} hardShadow='5' borderRadius={30} mx={'$4'} my={'$2'}>
                <Text>Chat da IA</Text>
            </Box>
        </Box>
    )
}