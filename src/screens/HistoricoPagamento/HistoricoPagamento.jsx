import { Box, Button, ButtonText, useToast, FlatList } from "@gluestack-ui/themed"
import { useEffect, useState } from "react";
import CardBoxPagamento from "./CardBoxPagamento";
import { buscarTodosPagamentos, cadastrarPagamento, buscarPagamentoPorId, editarPagamento, excluirPagamento } from "../../service/api/requests/pagamentoRequest";
import ToastConfig from "../../components/toasts/ToastConfig";
import { FormHistPagamento } from "./FormHistPagamento";
import { useSelector } from "react-redux";


export default HistoricoPagamentos = ({ navigation }) => {
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [dadosFormEdicao, setDadosFormEdicao] = useState();
    const [pagamentos, setPagamentos] = useState([]);
    const toast = useToast();
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
            toast.show(ToastConfig('error', 'Erro ao encotrar!', error.response.data.message, (v) => toast.close(v)));
        }
    }

    const handleExcluirPagamento = async (id) => {
        try {
            await excluirPagamento(id);
            buscarPagamentos();
            toast.show(ToastConfig('success', 'Sucesso', 'Sucesso ao deletar!', (v) => toast.close(v)));
        } catch (error) {
            toast.show(ToastConfig('error', 'Erro ao deletar!', error.response.data.message, (v) => toast.close(v)));
        }
    }

    const handleEditarPagamento = async (id) => {
        await buscarPagamentoPorId(id).then((response) => {
            console.log('usuarioId é esse: ', response.data.usuarioId)
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
            toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
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
                <Button size='xl' borderRadius={'$xl'} variant="outline">
                    <ButtonText>Filtros</ButtonText>
                </Button>
                {
                    userInfo.tipoAcesso == 'GESTAO' || userInfo.tipoAcesso == 'ADMIN' || userInfo.tipoAcesso == 'ALUNO' &&
                    (
                        <Button size='xl' borderRadius={'$xl'} onPress={() => setFormIsOpen(true)}>
                            <ButtonText maxFontSizeMultiplier={1.5} >
                                Cadastrar
                            </ButtonText>
                        </Button>
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