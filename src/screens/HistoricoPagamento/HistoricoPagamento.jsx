import { Box, FlatList } from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import CardBoxPagamento from "./CardBoxPagamento";
import { buscarTodosPagamentos, cadastrarPagamento, buscarPagamentoPorId, editarPagamento, excluirPagamento } from "../../service/api/requests/pagamentoRequest";
import { FormHistPagamento } from "./FormHistPagamento";
import { useSelector } from "react-redux";
import { Button } from "../../components/buttons/Button";
import { useToast } from "react-native-toast-notifications";


export default HistoricoPagamentos = ({ navigation }) => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [dadosFormEdicao, setDadosFormEdicao] = useState();
    const [pagamentos, setPagamentos] = useState([]);
    const globalToast = useToast();
    const userInfo = useSelector(state => state.auth.user);
    useEffect(() => {
        navigation.setOptions({ onRightButtonPress: buscarPagamentos })
    }, [navigation]);

    const buscarPagamentos = async () => {
        try {
            const dados = await buscarTodosPagamentos();
            setPagamentos(dados);
        } catch (error) {
            console.error('Erro ao obter pagamentos:', error);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const handleExcluirPagamento = async (id) => {
        try {
            await excluirPagamento(id);
            buscarPagamentos();
            globalToast.show("Sucesso", { data: { messageDescription: 'Pagamento excluído com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Erro ao excluir", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const handleEditarPagamento = async (id) => {
        await buscarPagamentoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                txid: response.data.txid,
                copiaCola: response.data.copiaCola,
                usuarioId: response.data.usuarioId,
                tipo: response.data.tipo,
                valor: response.data.valor,
                multa: response.data.multa,
                dataVencimento: response.data.dataVencimento,
                dataPagamento: response.data.dataPagamento,
                situacao: response.data.situacao,
            }
            setDadosFormEdicao(dados);
            setFormIsOpen(true);
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            globalToast.show("Erro ao editar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        })
    }

    const handleFormClose = (reconsultarRegistro) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistro) {
            buscarPagamentos()
        }
    }


    useEffect(() => {
        buscarPagamentos();
    }, []);

    const renderItem = ({ item }) => (
        <CardBoxPagamento
            id={item.id}
            usuario={item.usuario_id}
            situacao={item.situacao}
            dataVencimento={item.data_vencimento}
            dataPagamento={item.data_pagamento}
            valor={item.valor}
            voidDelete={() => handleExcluirPagamento(item.id)}
            voidEdit={() => handleEditarPagamento(item.id)}
        />
    );

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormHistPagamento onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <Box mx={20} mb={15} justifyContent="space-between" borderRadius={'$5x1'} flexDirection="row">
                <Button label={'Filtros'} variant={'outline'} action={'secondary'} />
                {
                    userInfo.tipoAcesso == 'GESTAO' &&
                    (
                        <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
                    )}
            </Box>
            <FlatList
                data={pagamentos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </Box >

    )
}