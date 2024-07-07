import { Avatar, AvatarImage, Box, Card, FlatList, HStack, Heading, Text } from '@gluestack-ui/themed'
import { useEffect, useState } from 'react'
import Situacao from '../../components/Situacao'
import { Button } from '../../components/buttons/Button'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu'
import { useDialog } from "../../components/dialog/DialogContext"
import AtivoInativoEnum from '../../enums/AtivoInativoEnum'
import { buscarAssociacaoPorId, buscarTodasAssociacoes, excluirAssociacao } from '../../service/api/requests/associacaoRequests'
import { FormAssociacao } from './FormAssociacao'
import { useToast } from "react-native-toast-notifications"
import { AvatarFallbackText } from '@gluestack-ui/themed'

export const Associacao = ({ navigation }) => {
    const globalToast = useToast()

    const [associacoes, setAssociacoes] = useState([])
    const [dadosFormEdicao, setDadosFormEdicao] = useState();
    const [filtros, setFiltros] = useState({
        iLike: {
            nome: null,
        },
    });
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [filtersIsOpen, setFiltersIsOpen] = useState(false);

    useEffect(() => {
        navigation.setOptions({ onRightButtonPress: buscarAssociacoes })
    }, [navigation]);

    const buscarAssociacoes = async () => {
        try {
            setListIsRefreshing(true);
            const response = await buscarTodasAssociacoes(filtros);
            setAssociacoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setListIsRefreshing(false)
        }
    };

    const acaoExcluirAssociacao = async (id) => {
        try {
            await excluirAssociacao(id);
            buscarAssociacoes();
            globalToast.show("Sucesso", { data: { messageDescription: 'Usuário excluído com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Falha ao excluir a associação", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const acaoEditarAssociacao = async (id) => {
        await buscarAssociacaoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                cnpj: response.data.cnpj,
                nome: response.data.nome,
                endereco: response.data.endereco,
                situacao: response.data.situacao,
                logo: response.data.logoUrl,
            }
            setDadosFormEdicao(dados);
            setFormIsOpen(true);
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            globalToast.show("Erro ao editar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        })
    }

    const renderItem = ({ item }) => (
        <Card bg={'white'} $dark-bg="$backgroundDark925" flexDirection="col" px={12} mb={10} mx={15} borderLeftWidth={10} borderColor={'$yellow500'} borderRadius={'$xl'} hardShadow='5'>
            <Box justifyContent="space-between" flexDirection="col">
                <HStack justifyContent='space-between' my={12}>
                    <HStack alignItems='center' gap={12} >
                        <Avatar>
                            {
                                item.logoUrl ?
                                    (<AvatarImage source={process.env.EXPO_PUBLIC_FILES_API_URL
                                        + item.logoUrl} alt={'logo'} />)
                                    :
                                    (<AvatarFallbackText>{item.nome}</AvatarFallbackText>)
                            }
                        </Avatar>
                        <Box>
                            <Heading color={'$textDark700'} $dark-color={'$textLight100'}>{item.nome}</Heading>
                            <Text color={'$textDark700'} $dark-color={'$textLight100'}>{item.endereco}</Text>
                        </Box>
                    </HStack>
                    <Box alignItems='flex-end' justifyContent='space-between' >
                        <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={
                            [{
                                onPress: () => acaoEditarAssociacao(item.id),
                                nomeIcone: 'pencil-outline',
                                corIcone: '#005db4',
                                label: 'Editar',
                            },
                            {
                                onPress: () => {
                                    openDialog('EXCLUIR', { onPress: () => acaoExcluirAssociacao(item.id) })
                                },
                                nomeIcone: 'trash-can-outline',
                                corIcone: '#dc2626',
                                label: 'Excluir',
                            },
                            ]
                        } />
                        <Situacao situacao={AtivoInativoEnum[item.situacao]} pr={10} />
                    </Box>
                </HStack>
            </Box>
        </Card>
    );

    useEffect(() => {
        buscarAssociacoes();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarAssociacoes();
        }
    }
    const { openDialog } = useDialog();

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormAssociacao onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='flex-end'>
                <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10} >
                <FlatList
                    data={associacoes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={() => buscarAssociacoes()}

                />
            </Box>
        </Box>
    )
}