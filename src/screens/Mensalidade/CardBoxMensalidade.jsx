import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
import { useState } from "react";
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

export const CardBoxMensalidade = ({ dados }) => {
    const [exibirDetalhesFatura, setExibirDetalhesFatura] = useState(false);

    console.log(dados)

    return (
        <Pressable w={'$full'} onPress={() => setExibirDetalhesFatura(!exibirDetalhesFatura)}>
            <Card bg={'$white'} flexDirection="col" w={'$full'} p={12} borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} gap={12} >
                <Box justifyContent="space-between" flexDirection="row">
                    <Box flexDirection="row" gap={12}>
                        <Avatar></Avatar>
                        <Box>
                            <Heading fontSize={'$xl'} maxFontSizeMultiplier={1.2}>{dados?.usuario?.nome}</Heading>
                            <Text fontSize={'$xl'} maxFontSizeMultiplier={1.2}>{dados?.usuario?.curso?.nome} - {dados?.usuario?.curso?.instituicao?.nome}</Text>
                        </Box>
                    </Box>
                    <Box flexDirection="row" justifySelf={'flex-end'} gap={5} h={50} alignItems="center">
                        <Box bg={'$yellow500'} h={15} aspectRatio={'1/1'} borderRadius={'$full'}></Box>
                        <Text color={'$yellow500'} maxFontSizeMultiplier={1.2} fontSize={'$xl'} fontWeight="$extrabold" textAlignVertical="center">Aberto</Text>
                    </Box>
                </Box>
                <Box flexDirection="row" alignItems="flex-start" justifyContent="space-between">
                    {/* <DaysCircle daysActive={dados?.usuario?.diasUsoTransporte} /> Arrumar pois não está retornando esse dado */}
                    <DaysCircle daysActive={['TERCA']} />
                    <Box flexDirection="row" gap={2} >
                        <Box flexDirection="col" alignItems="flex-end">
                            <Text fontWeight="$bold" maxFontSizeMultiplier={1.2}>Venc.:</Text>
                            <Text mt={5} fontWeight="$bold" maxFontSizeMultiplier={1.2} fontSize={'$xl'}>Total:</Text>
                        </Box>
                        <Box flexDirection="col" alignItems="flex-end">
                            <Text maxFontSizeMultiplier={1.2}>{moment(dados?.dataVencimento).format('DD/MM/YYYY')}</Text>
                            <Text mt={5} fontWeight="$bold" maxFontSizeMultiplier={1.2} fontSize={'$xl'}>R$ {dados?.valor}</Text>
                        </Box>
                    </Box>
                </Box>
                {exibirDetalhesFatura &&
                    (
                        <Box flexDirection="col" alignItems="flex-end">
                            <Box flexDirection={'row'} gap={4}>
                                <Text fontWeight="$bold">Multas:</Text>
                                <Text>R$ {dados?.multa}</Text>
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
    )
}