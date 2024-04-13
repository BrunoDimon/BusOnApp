import React, { useState, useEffect } from 'react';
import { Box, FlatList } from '@gluestack-ui/themed';
import { obterTodosPagamentos } from '../../service/api/requests/pagamentoRequest';
import ItemListPagamento from './ItemListPagamento';


export default function ListPagamento() {
    const [pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
        async function buscarPagamentos() {
            try {
                const dados = await obterTodosPagamentos();
                setPagamentos(dados);
            } catch (error) {
                console.error('Erro ao obter pagamentos:', error);
            }
        }

        buscarPagamentos();
    }, []);

    const renderItem = ({ item }) => (
        <ItemListPagamento
            situacao={item.situacao}
            data={item.data_vencimento}
            valor={item.valor}
            mes={item.mes}
        />
    );

    return (
        <FlatList
            data={pagamentos}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
        />
    );
}
