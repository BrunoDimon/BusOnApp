import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text } from "@gluestack-ui/themed"
import { useState } from "react"
import ItemList from "../../components/ItemList"
import Situacao from "../../components/Situacao"
import formatarValorEmReais from "../../functions/FormatarValorEmReais"
import { format } from 'date-fns';

export default function ItemListPagamento({ situacao, data, valor, mes }) {
    return (
        <ItemList title={mes} >
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
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{format(date, 'dd/MM/yyyy')}</Text>
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}> | </Text>
                            <Text mt={5} fontWeight="$bold" fontSize={'$xl'}>{formatarValorEmReais(valor)}</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </ItemList>

    )
} 