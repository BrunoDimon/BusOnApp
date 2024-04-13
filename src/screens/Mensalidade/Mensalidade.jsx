import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
import QRCode from "react-native-qrcode-svg"
import Label from "../../components/Label"
import * as Clipboard from 'expo-clipboard';
import { useState } from "react"
import { Circle } from "react-native-svg"
import DaysCircle from "../../components/DaysCircle"

export default Mensalidade = () => {
    const [chavePixGerada, setChavePixGerada] = useState('chave.gerada.teste.1234.banco.bb');
    const [exibirDetalhesFatura, setExibirDetalhesFatura] = useState(false);
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(chavePixGerada);
    };

    return (
        <Box flex={1} >
            <ScrollView flex={1} >
                <Box flex={1} bg={'$white'} mx={20} borderRadius={'$3xl'}>
                    <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                        <Heading fontSize={'$2xl'} color="#525252">
                            Janeiro
                        </Heading>
                        <Box w={'$full'} h={'auto'} aspectRatio={'1/1'} borderRadius={50} bgColor="$yellow300" justifyContent="center" alignItems="center">
                            <Box p={30} justifyContent="center" alignItems="center" bgColor="$white" borderRadius={37}>
                                <QRCode
                                    value="VALOR GERADO A PARTIR DA API PIX DO BANCO DO BRASIL"
                                    size={225}
                                />
                            </Box>
                        </Box>
                        <Box w={'$full'}>
                            <Label label={"Copiar Chave PIX"} >
                                <Input h={50} borderRadius={'$xl'} isReadOnly >
                                    <InputField type={'text'} onChangeText={value => setChavePixGerada(value)} value={chavePixGerada} />
                                    <InputSlot onPress={copyToClipboard}>
                                        <InputIcon pr="$8" pb={'$5'} size='xs' ><CopyIcon size='lg' color='gray' /></InputIcon>
                                    </InputSlot>
                                </Input>
                            </Label>
                        </Box>
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
                    </Box>
                </Box >
            </ScrollView>
        </Box>

    )
}