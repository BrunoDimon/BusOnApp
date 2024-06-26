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
import { Button } from "../../components/buttons/Button";
import { BadgeCheck, BadgeX } from "lucide-react-native";
moment.locale('pt-br');

export default function CardBoxPagamento({ dados, voidDelete, voidEdit, exibirBotoesAprovarPagamento, voidAprovar, voidReprovar }) {
    const { openDialog } = useDialog();
    const userInfo = useSelector(state => state.auth.user);
    const [exibirDetalhesFatura, setExibirDetalhesFatura] = useState(false);

    return (
        <Pressable mb={10} w={'$full'} onPress={() => setExibirDetalhesFatura(!exibirDetalhesFatura)}>

            <CardBox borderLeftWidth={10} borderColor={'$yellow500'} borderRadius={'$xl'} pr={15} h={'$2xl'} justifyContent="space-between">
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
                                                {
                                                    dados?.usuario?.fotoUrl ?
                                                        (<AvatarImage source={process.env.EXPO_PUBLIC_FILES_API_URL + dados?.usuario?.fotoUrl} alt={'foto'} />)
                                                        :
                                                        (<AvatarFallbackText>{dados?.usuario?.nome}</AvatarFallbackText>)
                                                }
                                            </Avatar>


                                            <VStack flex={1}>
                                                <Heading numberOfLines={1} color={'$textDark700'} $dark-color={'$textLight100'}>{dados?.usuario?.nome}</Heading>
                                                <Text numberOfLines={1} color={'$textDark700'} $dark-color={'$textLight100'} >{dados?.usuario?.curso?.nome} - {dados?.usuario?.curso?.instituicao?.nome}</Text>
                                            </VStack>
                                        </>
                                    )
                                }
                            </Box >

                            {
                                userInfo.tipoAcesso !== 'ALUNO' &&
                                (
                                    <Box alignSelf="flex-start">

                                        < ButtonDotsDropdownMenu titulo={dados?.usuario?.id + ' - ' + dados?.usuario?.nome} opcoesMenu={
                                            [{
                                                onPress: () => { voidEdit() },
                                                nomeIcone: 'pencil-outline',
                                                corIcone: '#005db4',
                                                label: 'Editar',
                                            },
                                            {
                                                onPress: () => {
                                                    openDialog('EXCLUIR', { onPress: () => { voidDelete() } })
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
                            <Box flex={1}>
                                <Situacao mt={5} situacao={SituacaoPagamentoEnum[dados.situacao]} />
                            </Box>
                            <Box flexDirection="row" justifyContent="space-between" adjustsFontSizeToFit={true} >
                                <Box flexDirection="row" gap={2} alignItems="center">
                                    <Box flexDirection="row" alignItems="flex-end">
                                        <Box>
                                            <Text textAlign="center" mt={5} fontWeight="$bold" fontSize={'$md'}>{dados.dataPagamento ? 'Pago ' : 'Vencimento'}</Text>
                                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{moment(dados.dataPagamento || dados.dataVencimento).format('DD/MM/yyyy')}</Text>
                                        </Box>
                                        <Text mt={5} fontWeight="$bold" fontSize={'$xl'}> | </Text>
                                        <Box >
                                            <Text textAlign="center" mt={5} fontWeight="$bold" fontSize={'$md'}>{'Total'}</Text>
                                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(dados.valorTotal)}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        {
                            exibirBotoesAprovarPagamento &&
                            (
                                <HStack alignSelf="flex-end" gap={5} mt={10}>
                                    <Button onPress={() => voidReprovar()} icon={BadgeX} action={'negative'} />
                                    <Button onPress={() => voidAprovar()} icon={BadgeCheck} action={'positive'} />
                                </HStack>
                            )
                        }

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