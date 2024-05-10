import { Box, Heading, Text, Avatar, HStack, VStack } from "@gluestack-ui/themed"
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
moment.locale('pt-br');

export default function CardBoxPagamento({ dados, voidDelete, voidEdit }) {
    const { openDialog } = useDialog();
    const userInfo = useSelector(state => state.auth.user);

    return (
        <CardBox borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} pr={15} mb={10} h={'$2xl'} justifyContent="space-between">
            <Box flex={1} justifyContent="center" flexDIrection="col">

                <HStack justifyContent="space-between" alignItems="center">
                    <Box flexDirection="row" gap={12} alignItems="center" mb={2} justifyContent="space-between">
                        <Avatar></Avatar>
                        {userInfo.tipoAcesso == 'ALUNO' ? (

                            <Box flex={1}>
                                <Heading numberOfLines={1} flexWrap="wrap" textTransform="capitalize" >{moment(dados.dataVencimento || dados.dataPagamento).format('MMMM')}</Heading>
                            </Box>
                        )
                            : (
                                <VStack flex={1}>
                                    <Heading numberOfLines={1} color={'$textDark700'}>{dados?.usuario?.nome}</Heading>
                                    <Text numberOfLines={1} color={'$textDark700'}>{dados?.usuario?.curso?.nome} - {dados?.usuario?.curso?.instituicao?.nome}</Text>
                                </VStack>
                            )
                        }
                    </Box >

                    {

                        userInfo.tipoAcesso !== 'ALUNO' &&
                        (
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
                                <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(dados.valor)}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box >

        </CardBox >

    )
}
/*
 */