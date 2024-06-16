import { Avatar, Box, Card, CopyIcon, Divider, Heading, Input, InputField, InputIcon, ScrollView, Pressable, InputSlot, Text, FlatList } from "@gluestack-ui/themed"
import QRCode from "react-native-qrcode-svg"
import Label from "../../components/Label"
import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from "react"
import { Circle } from "react-native-svg"
import DaysCircle from "../../components/DaysCircle"
import { useSelector } from "react-redux";
import { buscarTodosPagamentos } from "../../service/api/requests/pagamentoRequest";
import { useToast } from "react-native-toast-notifications";
import { CardBoxMensalidade } from "./CardBoxMensalidade";


export default Mensalidade = () => {
    const [chavePixGerada, setChavePixGerada] = useState('chave.gerada.teste.1234.banco.bb');
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [pagamentos, setPagamentos] = useState([]);
    const globalToast = useToast();
    const userInfos = useSelector(state => state.auth.user);
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(chavePixGerada);
    };

    const buscarPagamentos = async () => {
        const filters = { notEquals: { situacao: 'PAGO' }, equals: { usuarioId: userInfos.id } }
        const filtersAssociacao = { equals: { id: userInfos.associacaoId } }
        try {
            setListIsRefreshing(true);
            const dados = await buscarTodosPagamentos(filters, filtersAssociacao);
            setPagamentos(dados.data);
        } catch (error) {
            console.error('Erro ao obter pagamentos:', error);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })

        } finally {
            setListIsRefreshing(false);
        }
    };

    useEffect(() => {
        buscarPagamentos();
    }, []);

    const renderItem = ({ item }) => (
        <CardBoxMensalidade
            dados={item}
        />
    );

    return (
        <Box flex={1} >
            <Box flex={0} bg={'$white'} mx={20} borderRadius={'$3xl'}>
                <Box justifyContent="flex-start" alignItems="center" gap={15} p={15}>
                    <Heading fontSize={'$2xl'} color="#525252">
                        Janeiro
                    </Heading>
                    <Box w={'$full'}>
                        <Label label={"Copiar Chave PIX"} >
                            <Input h={50} borderRadius={'$xl'} isReadOnly >
                                <InputField type={'text'} onChangeText={value => setChavePixGerada(value)} value={chavePixGerada} />
                                <InputSlot onPress={copyToClipboard}>
                                    <InputIcon pr="$8" pb={'$5'} size='xs' ><CopyIcon size='22' color='gray' /></InputIcon>
                                </InputSlot>
                            </Input>
                        </Label>
                    </Box>

                </Box>
            </Box >
            <Box flex={1} pt={10} mx={15}>

                <FlatList
                    data={pagamentos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={() => buscarPagamentos()}
                />
            </Box>
        </Box>

    )
}