import React, { useState, useEffect } from 'react';
import { Box, FlatList } from '@gluestack-ui/themed';
import ItemListPagamento from './itemListPagamento';
import { obterTodosPagamentos } from '../../service/api/requests/pagamentoRequest';
import Toast from '../../components/Toast';


export default function ListPagamento() {
    const [pagamentos, setPagamentos] = useState([]);

    useEffect(() => {
        async function buscarPagamentos() {
            try {
                const dados = await obterTodosPagamentos();
                setPagamentos(dados);
            } catch (error) {
                console.error('Erro ao obter pagamentos:', error);
                <Toast actionType={error} title={'Erro!'} description={error.response ? error.response.data : 'Erro ao excluir o Pagamento! '} />
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
