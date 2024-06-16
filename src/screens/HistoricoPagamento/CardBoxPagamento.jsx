import { Box, Heading, Text, Avatar, HStack, VStack, AvatarImage, Pressable } from "@gluestack-ui/themed"
import Situacao from "../../components/Situacao"
import moment from 'moment';
import 'moment/locale/pt-br';
import ButtonDotsDropdownMenu from "../../components/buttons/ButtonDotsDropdownMenu";
import { useDialog } from "../../components/dialog/DialogContext";
import { Dialog } from "../../components/dialog/Dialog";
import CardBox from "../../components/CardBox";
import formatarValorEmReais from "../../functions/FormatarValorEmReais";
import { useSelector } from "react-redux";
import SituacaoPagamentoEnum from "../../enums/SituacaoPagamentoEnum";
import { AvatarFallbackText } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { useState } from "react";
import { Divider } from "@gluestack-ui/themed";
moment.locale('pt-br');

export default function CardBoxPagamento({ dados, voidDelete, voidEdit }) {
    const { openDialog } = useDialog();
    const userInfo = useSelector(state => state.auth.user);
    const [exibirDetalhesFatura, setExibirDetalhesFatura] = useState(false);

    return (
        <Pressable mb={10} w={'$full'} onPress={() => setExibirDetalhesFatura(!exibirDetalhesFatura)}>
            <CardBox borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} pr={15} h={'$2xl'} justifyContent="space-between">
                <HStack flex={1} justifyContent="center" flexDIrection="col">
                    <VStack flex={1}>
                        <HStack justifyContent="space-between" alignItems="center">
                            <Box flex={1} flexDirection="row" gap={12} alignItems="center" mb={2} justifyContent="space-between">
                                {userInfo.tipoAcesso == 'ALUNO' ? (
                                    <>
                                        <Box hardShadow="5" bg={'$coolGray200'} rounded={"$3xl"}>
                                            <Image source={require('../../../assets/qrCode.png')} alt="qrCode" h={60} w={60} />
                                        </Box>

                                        <Box flex={1}>
                                            <Heading numberOfLines={1} flexWrap="wrap" textTransform="capitalize" >{moment(dados.dataVencimento || dados.dataPagamento).format('MMMM')}</Heading>
                                        </Box>
                                    </>
                                )
                                    : (
                                        <>
                                            <Avatar>
                                                <AvatarFallbackText>{dados?.usuario?.nome}</AvatarFallbackText>
                                            </Avatar>
                                            <VStack flex={1}>
                                                <Heading numberOfLines={1} color={'$textDark700'}>{dados?.usuario?.nome}</Heading>
                                                <Text numberOfLines={1} color={'$textDark700'}>{dados?.usuario?.curso?.nome} - {dados?.usuario?.curso?.instituicao?.nome}</Text>
                                            </VStack>
                                        </>
                                    )
                                }
                            </Box >

                            {
                                userInfo.tipoAcesso !== 'ALUNO' &&
                                (
                                    <Box alignSelf="flex-start">

                                        < ButtonDotsDropdownMenu titulo={'id' + '-' + 'nome'} opcoesMenu={
                                            [{
                                                onPress: () => { voidEdit() },
                                                nomeIcone: 'pencil-outline',
                                                corIcone: '#005db4',
                                                label: 'Editar',
                                            },
                                            {
                                                onPress: () => {
                                                    openDialog('EXCLUIR', { onPress: () => { voidDelete(id) } })
                                                },
                                                nomeIcone: 'trash-can-outline',
                                                corIcone: '#dc2626',
                                                label: 'Excluir',
                                            },
                                            ]
                                        } />
                                    </Box>
                                )
                            }
                        </HStack>
                        <Box justifyContent="space-between" flexDirection="row" alignItems="center" mt={8}>
                            <Situacao situacao={SituacaoPagamentoEnum[dados.situacao]} />
                            <Box flexDirection="row" justifyContent="space-between" adjustsFontSizeToFit={true} >
                                <Box flexDirection="row" gap={2} alignItems="center">
                                    <Box flexDirection="row" alignItems="flex-end">
                                        <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{moment(dados.dataPagamento || dados.dataVencimento).format('DD/MM/yyyy')}</Text>
                                        <Text mt={5} fontWeight="$bold" fontSize={'$xl'}> | </Text>
                                        <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(dados.valorTotal)}</Text>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {exibirDetalhesFatura &&
                            (
                                <Box flexDirection="col" alignItems="flex-end">
                                    <Box flexDirection={'row'} gap={4}>
                                        <Text fontWeight="$bold">Multas:</Text>
                                        <Text>{formatarValorEmReais(dados?.multa)}</Text>
                                    </Box>
                                    <Box flexDirection={'row'} gap={4}>
                                        <Text fontWeight="$bold">Mensalidade:</Text>
                                        <Text>{formatarValorEmReais(dados?.valor)}</Text>
                                    </Box>
                                    <Divider mt={5} />
                                    <Box flexDirection={'row'} gap={4}>
                                        <Text fontWeight="$bold">Total:</Text>
                                        <Text fontWeight="$bold">{formatarValorEmReais(dados?.valorTotal)}</Text>
                                    </Box>
                                </Box>
                            )
                        }
                    </VStack>
                </HStack >
            </CardBox >
        </Pressable >
    )
}
/*
 */