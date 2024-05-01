import { Box, Heading, Text, Avatar } from "@gluestack-ui/themed"
import Situacao from "../../components/Situacao"
import moment from 'moment';
import 'moment/locale/pt-br';
import ButtonDotsDropdownMenu from "../../components/buttons/ButtonDotsDropdownMenu";
import { useDialog } from "../../components/dialog/DialogContext";
import { Dialog } from "../../components/dialog/Dialog";
import CardBox from "../../components/CardBox";
import formatarValorEmReais from "../../functions/FormatarValorEmReais";
import { useSelector } from "react-redux";
moment.locale('pt-br');

export default function CardBoxPagamento({ id, usuario, dataVencimento, dataPagamento, valor, situacao, multa, voidDelete, voidEdit }) {
    const { openDialog } = useDialog();
    const userInfo = useSelector(state => state.auth.user);

    return (
        <CardBox borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} pr={15} mb={10} h={'$2xl'} justifyContent="space-between">
            <Box flex={1} justifyContent="center" flexDIrection="col">
                <Box flexDirection="row" gap={12} alignItems="center" mb={2} justifyContent="space-between">
                    <Avatar></Avatar>
                    <Box flex={1}>
                        <Heading numberOfLines={1} flexWrap="wrap" textTransform="capitalize" >{moment(dataVencimento || dataPagamento).format('MMMM')}</Heading>
                    </Box>
                </Box >
                <Box justifyContent="space-between" flexDirection="row" alignItems="center">
                    {situacao === 'ABERTO' && (
                        <Situacao situacao={'Aberto'} />
                    )}
                    {situacao === 'PAGO' && (
                        <Situacao situacao={'Pago'} />
                    )}
                    {situacao === 'ATRASADO' && (
                        <Situacao situacao={'Atrasado'} />
                    )}
                    <Box flexDirection="row" justifyContent="space-between" adjustsFontSizeToFit={true}>
                        <Box flexDirection="row" gap={2} >
                            <Box flexDirection="row" alignItems="flex-end">
                                <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{moment(dataPagamento).format('DD/MM/yyyy')}</Text>
                                <Text mt={5} fontWeight="$bold" fontSize={'$xl'}> | </Text>
                                <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(valor)}</Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
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
        </CardBox >

    )
}
/*
 */