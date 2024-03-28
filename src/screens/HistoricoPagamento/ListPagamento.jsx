import React, { useState, useEffect } from 'react';
import { Box, FlatList } from '@gluestack-ui/themed';
import ItemListPagamento from './itemListPagamento';
import { obterTodosPagamentos } from '../../service/api/requests/pagamentoRequest';
import Toast from '../../components/Toast';


export default function ListPagamento() {
    /* const valores = [
         {
             id: 1,
             situacao: 'PAGO',
             data: '10/01/2024',
             valor: 65,
             mes: 'Janeiro',
         },
         {
             id: 2,
             situacao: 'PAGO',
             data: '10/02/2024',
             valor: 80,
             mes: 'Fevereiro',
         },
         {
             id: 3,
             situacao: 'ATRASADO',
             data: '18/03/2024',
             valor: 80,
             mes: 'Março',
         },
         {
             id: 4,
             situacao: 'ABERTO',
             data: '10/04/2024',
             valor: 80,
             mes: 'Abril',
         },
         {
             id: 5,
             situacao: 'ABERTO',
             data: '10/05/2024',
             valor: 80,
             mes: 'Maio',
 
         },
         {
             id: 6,
             situacao: 'ABERTO',
             data: '10/06/2024',
             valor: 80,
             mes: 'Junho',
 
         }
     ];*/

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
