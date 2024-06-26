import { Box, FlatList } from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import CardBoxPagamento from "./CardBoxPagamento";
import { buscarTodosPagamentos, cadastrarPagamento, buscarPagamentoPorId, editarPagamento, excluirPagamento, aprovarPagamento, reprovarPagamento } from "../../service/api/requests/pagamentoRequest";
import { FormPagamento } from "./FormPagamento";
import { useSelector } from "react-redux";
import { Button } from "../../components/buttons/Button";
import { useToast } from "react-native-toast-notifications";


export default Pagamentos = ({ navigation }) => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [dadosFormEdicao, setDadosFormEdicao] = useState();
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [pagamentos, setPagamentos] = useState([]);
    const globalToast = useToast();
    const userInfos = useSelector(state => state.auth.user);
    const [exibirBotoesAprovarPagamento, setExibirBotoesAprovarPagamento] = useState(false);

    useEffect(() => {
        navigation.setOptions({ onRightButtonPress: buscarPagamentos })
    }, [navigation]);

    const eUsuarioGestao = userInfos.tipoAcesso == "GESTAO";
    const buscarPagamentos = async () => {
        const filters = !eUsuarioGestao && { equals: { usuarioId: userInfos.id } }
        const filtersAssociacao = { equals: { id: userInfos.associacaoId } }
        const ordenacao = { field: 'id', direction: 'ASC' }
        try {
            setListIsRefreshing(true);
            const dados = await buscarTodosPagamentos(filters, filtersAssociacao, ordenacao);
            setPagamentos(dados.data);
        } catch (error) {
            console.error('Erro ao obter pagamentos:', error);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })

        } finally {
            setListIsRefreshing(false);
        }
    };

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
    const acaoAprovarPagamento = async (id) => {
        await aprovarPagamento(id).then((response) => {
            globalToast.hideAll()
            globalToast.show(response.data.title, { data: { messageDescription: response.data.message }, type: 'success' })
            buscarPagamentos();
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            globalToast.show("Erro ao editar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        })
    }
    const acaoReprovarPagamento = async (id) => {
        await reprovarPagamento(id).then((response) => {
            globalToast.hideAll()
            globalToast.show(response.data.title, { data: { messageDescription: response.data.message }, type: 'success' })
            buscarPagamentos();
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
            dados={item}
            voidDelete={() => handleExcluirPagamento(item.id)}
            voidEdit={() => handleEditarPagamento(item.id)}
            voidAprovar={() => acaoAprovarPagamento(item.id)}
            voidReprovar={() => acaoReprovarPagamento(item.id)}
            exibirBotoesAprovarPagamento={exibirBotoesAprovarPagamento}
        />
    );

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormPagamento onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <Box mx={20} mb={15} justifyContent="space-between" borderRadius={'$5x1'} flexDirection="row">
                {
                    userInfos.tipoAcesso !== 'ALUNO' &&
                    (
                        <>
                            <Button label={'Aprov./Reprov.'} isLoading={formIsOpen} onPress={() => setExibirBotoesAprovarPagamento(!exibirBotoesAprovarPagamento)} variant={'outline'} action={'secondary'} />
                            <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
                        </>
                    )}
            </Box>
            <FlatList
                data={pagamentos}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={8}
                windowSize={4}
                refreshing={listIsRefreshing}
                onRefresh={() => buscarPagamentos()}
            />
        </Box >

    )
}

