import { Box, Pressable, Text, Center } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default TabBarIcon = ({ route, focused, onPress, index }) => {
    if (route.isMainRoute) {
        return (
            <Pressable flex={1} onPress={onPress} alignItems="center">
                <Center overflow={'hidden'} w={135} h={80}>
                    <Center w={130} h={130} borderRadius={80} bgColor={'$yellow500'} style={{ ...styles.shadow }}>
                        <MaterialCommunityIcons name={route.iconName} size={48} color={'white'} />
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }} allowFontScaling={false} adjustsFontSizeToFit={true} >{route.label}</Text>
                    </Center>
                </Center>
                {focused && <Box position='absolute' bottom={0} w={'$full'} bgColor='$yellow500' h={5}></Box>}
            </Pressable>

        )
    } else {
        return (
            <Pressable flex={1} onPress={onPress} alignItems="center">
                <Center overflow={'hidden'} h={80} w={'$full'}>
                    <Center>
                        <MaterialCommunityIcons name={route.iconName} size={36} color={'#FFC100'} />
                        <Text $dark-color="$white" $light-color={'#525252'} style={{ fontSize: 12, fontWeight: '700' }} allowFontScaling={false} >{route.label}</Text>
                    </Center>
                </Center>
                {focused && <Box position='absolute' bottom={0} w={'$full'} bgColor='$yellow500' h={5}></Box>}
            </Pressable>

        )
    }
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