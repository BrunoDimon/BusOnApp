import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
const initialColor = {
    amarelo: '$yellow500',
    verde: '#37AB00',
    vermelho: '#DB0000'
};
const initialColorSituation = {
    aberto: '$yellow500',
    pago: '#37AB00',
    atrasado: '#DB0000',
    ativo: '#37AB00',
    inativo: '#DB0000'
};

export default function Situacao({ cor, situacao, ...props }) {

    const color = cor ? initialColor[cor] : initialColorSituation[situacao?.toLowerCase()];
    return (
        <Box flexDirection="row" gap={5} h={20} alignItems="center" {...props}>
            <Box bg={color} h={10} aspectRatio={'1/1'} borderRadius={'$full'}></Box>
            <Text lineHeight={'$xs'} color={color} fontWeight="$extrabold" >{situacao}</Text>
        </Box>
    )
}