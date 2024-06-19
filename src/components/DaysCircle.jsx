import { Box, Text } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

export default DaysCircle = ({ daysActive }) => {
    const days = [
        'SEGUNDA',
        'TERCA',
        'QUARTA',
        'QUINTA',
        'SEXTA',
        'SABADO'
    ]
    const isActive = (day) => {
        return daysActive.includes(day);
    };
    return (
        <Box flexDirection="row" ml={10}>
            {
                days.map((day, index) => (
                    <Box key={index} ml={-10} zIndex={-index}>
                        <Box bgColor={isActive(day) ? '$yellow500' : '$light400'} $dark-bg={isActive(day) ? '$yellow500' : '$backgroundDark800'} w={36} aspectRatio={'1/1'} justifyContent="center" alignItems="center" borderRadius={'$full'} hardShadow="1">
                            <Text fontSize={'$xl'} fontWeight="$extrabold" color='$white'>
                                {day.charAt(0)}
                            </Text>
                        </Box>
                    </Box>
                ))
            }
        </Box>
    )
}
