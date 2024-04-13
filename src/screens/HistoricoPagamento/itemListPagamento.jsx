import { Box, Text } from "@gluestack-ui/themed"
import ItemList from "../../components/ItemList"
import Situacao from "../../components/Situacao"
import formatarValorEmReais from "../../functions/FormatarValorEmReais"
import moment from 'moment';
import 'moment/locale/pt-br';
import ButtonDotsDropdownMenu from "../../components/buttons/ButtonDotsDropdownMenu";
moment.locale('pt-br');

export default function ItemListPagamento({ situacao, data, valor, mes }) {
    return (
        <ItemList title={moment(data).format('MMMM')} >
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
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{moment(data).format('dd/MM/yyyy')}</Text>
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}> | </Text>
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(valor)}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ItemList >

    )
}
/* 
<ButtonDotsDropdownMenu titulo={'id' + '-' + 'nome'} opcoesMenu={
                        [{
                            //onPress: () => {voidEdit() },
                            nomeIcone: 'pencil-outline',
                            corIcone: '#005db4',
                            label: 'Editar',
                        },
                        {
                            /* onPress: () => {
                                openDialog('EXCLUIR', {onPress: () => {voidDelete(id)} })
                            }, 
                            nomeIcone: 'trash-can-outline',
                            corIcone: '#dc2626',
                            label: 'Excluir',
                        },
                        ]
                    } /> */