import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
const initialColor = {
    amarelo: '$yellow500',
    verde: '$success400',
    vermelho: '$error500'
};
const initialColorSituation = {
    aberto: '$yellow500',
    pago: '$success400',
    atrasado: '$error500',
    ativo: '$success400',
    inativo: '$error500'
};

export default function Situacao({ cor, situacao, ...props }) {

    const color = cor ? initialColor[cor] : initialColorSituation[situacao?.toLowerCase()];
    return (
        <Box flex={1} flexDirection="row" gap={5} alignItems="center"  {...props}>
            <Box bg={color} h={12} aspectRatio={'1/1'} borderRadius={'$full'}></Box>
            <Text fontSize={'$lg'} color={color} fontWeight="$extrabold" >{situacao}</Text>
        </Box>
    )
}