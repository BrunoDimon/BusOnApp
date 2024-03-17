import { Box, Text } from "@gluestack-ui/themed";
import { Center } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default TabBarIcon = ({ allRoutes, currentRoute, focused }) => {
    const route = allRoutes.find(route => route.name === currentRoute.name);
    if (route.isMainRoute) {
        return (
            <Center overflow={'hidden'} w={135} h={80}>
                {focused && <Box position='absolute' top={0} w={'$full'} bgColor='$yellow400' h={5}></Box>}
                <Center w={130} h={130} borderRadius={80} bgColor={'$yellow400'} style={{ ...styles.shadow }}>
                    <MaterialCommunityIcons name={route.iconName} size={40} color={'white'} />
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }} allowFontScaling={false} adjustsFontSizeToFit={true} >{route.name}</Text>
                </Center>
            </Center>
        )
    } else {
        return (
            <Center overflow={'hidden'} h={80} w={'$full'}>
                {focused && <Box position='absolute' top={0} w={'$full'} bgColor='$yellow400' h={5}></Box>}
                <Center>
                    <MaterialCommunityIcons name={route.iconName} size={36} color={'#FFD34C'} />
                    <Text color={'#525252'} style={{ fontSize: 12, fontWeight: '700' }} allowFontScaling={false} >{route.name}</Text>
                </Center>
            </Center>
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