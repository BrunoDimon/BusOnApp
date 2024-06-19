import { Box, Pressable, Text, Center } from "@gluestack-ui/themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default ButtonIconMenu = ({ route, focused, onPress, index }) => {
    return (
        <Pressable w={'$1/3'} onPress={onPress} >
            <Center h={80} w={'$full'} overflow="hidden" >
                <Center gap={4}>
                    <MaterialCommunityIcons name={route.iconName} size={38} color={'#FFC100'} />
                    <Text textAlign="center" color={'#525252'} $dark-color={'$light100'} fontSize={'$lg'} maxFontSizeMultiplier={1} adjustsFontSizeToFit={true} numberOfLines={1} fontWeight="$bold" >{route.label}</Text>
                </Center>
            </Center>
        </Pressable>
    )
}