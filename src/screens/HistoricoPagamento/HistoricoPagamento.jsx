import { Box, Button, ButtonText, useToast, FlatList } from "@gluestack-ui/themed"
import ListPagamento from "./itemListPagamento";
import { useEffect, useState } from "react";
import CardBoxPagamento from "./CardBoxPagamento";
import { buscarTodosPagamentos, cadastrarPagamento, buscarPagamentoPorId, editarPagamento, excluirPagamento } from "../../service/api/requests/pagamentoRequest";
import toastConfig from "../../components/toasts/ToastConfig";
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
            toast.show(toastConfig('error', 'Erro ao encotrar!', error.response.data.message, toast.close()));
        }
    }

    const handleExcluirPagamento = async (id) => {
        try {
            await excluirPagamento(id);
            buscarPagamentos();
            toast.show(toastConfig('success', 'Sucesso', 'Sucesso ao deletar!', toast.close()));
        } catch (error) {
            toast.show(toastConfig('error', 'Erro ao deletar!', error.response.data.message, toast.close()));
        }
    }

    const handleEditarPagamento = async (id) => {
        await buscarPagamentoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                usuario: response.data.usuario_id,
                dataVencimento: response.data.data_vencimento,
                dataPagamento: response.data.data_pagamento,
                valor: response.data.valor,
            }
            setDadosFormEdicao(dados);
            setFormIsOpen(true);
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            toast.show(toastConfig('error', 'Erro', error.response.data.message, toast.close()));
        })
    }

    const handleFormClose = () => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
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
                    userInfo.tipoAcesso == 'ACESSO_GESTAO' || userInfo.tipoAcesso == 'ACESSO_ADMIN' || userInfo.tipoAcesso == 'ACESSO_ALUNO' &&
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