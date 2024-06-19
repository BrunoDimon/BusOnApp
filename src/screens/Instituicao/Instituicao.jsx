import { Box, FlatList, HStack, VStack, Avatar, Heading, Text, AvatarImage, AvatarFallbackText } from '@gluestack-ui/themed'
import { Button } from '../../components/buttons/Button'
import { useEffect, useState } from 'react'
import { buscarInstituicaoPorId, buscarTodasInstituicoes, excluirInstituicao } from '../../service/api/requests/instituicaoRequests'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu'
import { Card } from '@gluestack-ui/themed'
import Situacao from '../../components/Situacao'
import AtivoInativoEnum from '../../enums/AtivoInativoEnum'
import { FormInstituicao } from './FormInstituicao'
import { useDialog } from "../../components/dialog/DialogContext";
import { useToast } from "react-native-toast-notifications";

export default function Instituicao({ navigation }) {
    const globalToast = useToast()

    const [instituicoes, setInstituicoes] = useState([])
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
        navigation.setOptions({ onRightButtonPress: buscarInstituicoes })
    }, [navigation]);

    const buscarInstituicoes = async () => {
        try {
            setListIsRefreshing(true);
            const response = await buscarTodasInstituicoes(filtros);
            setInstituicoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setListIsRefreshing(false)
        }
    };

    const acaoExcluirInstituicao = async (id) => {
        try {
            await excluirInstituicao(id);
            buscarInstituicoes();
            globalToast.show("Sucesso", { data: { messageDescription: 'Instituição excluída com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Erro ao excluir", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const acaoEditarInstituicao = async (id) => {
        await buscarInstituicaoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                nome: response.data.nome,
                endereco: response.data.endereco,
                situacao: response.data.situacao,
                associacaoId: response.data.associacaoId,
                logo: response.data?.logoUrl,
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
        <Card bg={'white'} flexDirection="col" px={12} mb={10} mx={15} borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} hardShadow='5'>
            <Box justifyContent="space-between" flexDirection="col">
                <HStack justifyContent='space-between' my={12}>
                    <HStack alignItems='center' gap={12} >
                        <Avatar>
                            {
                                item.logoUrl ?
                                    (<AvatarImage source={process.env.EXPO_PUBLIC_FILES_API_URL + item.logoUrl} alt={'logo'} />)
                                    :
                                    (<AvatarFallbackText>{item.nome}</AvatarFallbackText>)
                            }
                        </Avatar>
                        <Box>
                            <Heading color={'$textDark700'}>{item.nome}</Heading>
                            {item.endereco && (
                                <Text color={'$textDark700'}>{item.endereco}</Text>
                            )}
                        </Box>
                    </HStack>
                    <Box alignItems='flex-end' justifyContent='space-between' >
                        <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={
                            [{
                                onPress: () => acaoEditarInstituicao(item.id),
                                nomeIcone: 'pencil-outline',
                                corIcone: '#005db4',
                                label: 'Editar',
                            },
                            {
                                onPress: () => {
                                    openDialog('EXCLUIR', { onPress: () => acaoExcluirInstituicao(item.id) })
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
        buscarInstituicoes();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarInstituicoes();
        }
    }
    const { openDialog } = useDialog();

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormInstituicao onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='flex-end'>
                <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10} >
                <FlatList
                    data={instituicoes}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={() => buscarInstituicoes()}

                />
            </Box>
        </Box>
    )
}