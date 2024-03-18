import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"

import ListPagamento from "./ListPagamento";


export default HistoricoPagamentos = () => {
    return (
        <Box>
            <ListPagamento />
        </Box>

    )
}

/* <Box flex={1} bg={'$white'} mx={20} mb={15} borderRadius={'$3xl'}> 
     <ScrollView flex={1} >
         <Pressable w={'$full'} onPress={() => setExibirDetalhesFatura(!exibirDetalhesFatura)}>
             <Card bg={'$light100'} flexDirection="col" w={'$full'} p={12} borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} gap={12} >
                 <Box justifyContent="space-between" flexDirection="row">
                     <Box flexDirection="row" gap={12}>
                         <Avatar></Avatar>
                         <Box>
                             <Heading>Douglas Kuerten</Heading>
                             <Text>Eng. Software - UNISATC</Text>
                         </Box>
                     </Box>
                     <Box flexDirection="row" justifySelf={'flex-end'} gap={5} h={20} alignItems="center">
                         <Box bg={'$yellow500'} h={15} aspectRatio={'1/1'} borderRadius={'$full'}></Box>
                         <Text color={'$yellow500'} fontWeight="$extrabold" textAlignVertical="center">Aberto</Text>
                     </Box>
                 </Box>
                 <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
                     <DaysCircle daysActive={['SEGUNDA', 'TERCA', 'QUINTA', 'SEXTA']} />
                     <Box flexDirection="row" gap={2} >
                         <Box flexDirection="col" alignItems="flex-end">
                             <Text fontWeight="$bold">Venc.:</Text>
                             <Text mt={5} fontWeight="$bold" fontSize={'$2xl'}>Total:</Text>
                         </Box>
                         <Box flexDirection="col" alignItems="flex-end">
                             <Text>08/03/2024</Text>
                             <Text mt={5} fontWeight="$bold" fontSize={'$2xl'}>R$ 65.00</Text>
                         </Box>
                     </Box>
                 </Box>
                 {exibirDetalhesFatura &&
                     (
                         <Box flexDirection="col" alignItems="flex-end">
                             <Box flexDirection={'row'} gap={4}>
                                 <Text fontWeight="$bold">Multas:</Text>
                                 <Text>R$ 05.00</Text>
                             </Box>
                             <Box flexDirection={'row'} gap={4}>
                                 <Text fontWeight="$bold">Custos Adicionais:</Text>
                                 <Text>R$ 05.00</Text>
                             </Box>
                             <Box flexDirection={'row'} gap={4}>
                                 <Text fontWeight="$bold">Mensalidade:</Text>
                                 <Text>R$ 05.00</Text>
                             </Box>
                             <Divider mt={5} />
                             <Box flexDirection={'row'} gap={4}>
                                 <Text fontWeight="$bold">Total:</Text>
                                 <Text fontWeight="$bold">R$ 05.00</Text>
                             </Box>
                         </Box>
                     )
                 }
             </Card>
         </Pressable>
     </ScrollView>
 </Box> */