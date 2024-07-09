import { Box, FlatList, HStack, VStack, Avatar, Heading, Text, AvatarImage, AvatarFallbackText } from '@gluestack-ui/themed'
import { Button } from '../../components/buttons/Button'
import { useEffect, useState } from 'react'
import { buscarInstituicaoPorId, buscarTodasInstituicoes, excluirInstituicao } from '../../service/api/requests/instituicaoRequests'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu'
import { Card } from '@gluestack-ui/themed'
import Situacao from '../../components/Situacao'
import AtivoInativoEnum from '../../enums/AtivoInativoEnum'
import { FormTemplatesDocumentos } from './FormTemplatesDocumentos'
import { useDialog } from "../../components/dialog/DialogContext";
import { useToast } from "react-native-toast-notifications";
import { buscarTemplateDocumentoPorId, buscarTodosTemplatesDocumentos, excluirTemplateDocumento } from '../../service/api/requests/templateDocumentoRequest'

export default function TemplatesDocumentos({ navigation }) {
    const globalToast = useToast()

    const [templatesDocumentos, setTemplatesDocumentos] = useState([])
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
        navigation.setOptions({ onRightButtonPress: buscarTemplateDocumentos })
    }, [navigation]);

    const buscarTemplateDocumentos = async () => {
        try {
            setListIsRefreshing(true);
            const response = await buscarTodosTemplatesDocumentos(filtros);
            setTemplatesDocumentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar os templates de documentos:', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setListIsRefreshing(false)
        }
    };

    const acaoExcluirTemplateDocumento = async (id) => {
        try {
            await excluirTemplateDocumento(id);
            buscarTemplateDocumentos();
            globalToast.show("Sucesso", { data: { messageDescription: 'Template de documento excluído com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Falha ao excluir o template de documento", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const acaoEditarTemplateDocumento = async (id) => {
        await buscarTemplateDocumentoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                associacaoId: response.data.associacaoId,
                nome: response.data.nome,
                situacao: response.data.situacao,
                htmlTemplate: response.data?.htmlTemplate,
            }
            setDadosFormEdicao(dados);
            setFormIsOpen(true);
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            globalToast.show("Erro ao editar o template de documento", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        })
    }

    const renderItem = ({ item }) => (
        <Card bg={'white'} $dark-bg="$backgroundDark925" flexDirection="col" px={12} mb={10} mx={15} borderLeftWidth={10} borderColor={'$yellow500'} borderRadius={'$xl'} hardShadow='5'>
            <Box justifyContent="space-between" flexDirection="col">
                <HStack justifyContent='space-between' my={12}>
                    <HStack flex={1} alignItems='center' gap={12} >
                        <VStack flex={1}>
                            <HStack flex={1} alignItems='flex-end' justifyContent='space-between' >
                                <Heading flex={1} color={'$textDark700'} $dark-color={'$textLight100'}>{item.nome}</Heading>
                                <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={
                                    [{
                                        onPress: () => acaoEditarTemplateDocumento(item.id),
                                        nomeIcone: 'pencil-outline',
                                        corIcone: '#005db4',
                                        label: 'Editar',
                                    },
                                    {
                                        onPress: () => {
                                            openDialog('EXCLUIR', { onPress: () => acaoExcluirTemplateDocumento(item.id) })
                                        },
                                        nomeIcone: 'trash-can-outline',
                                        corIcone: '#dc2626',
                                        label: 'Excluir',
                                    },
                                    ]
                                } />
                            </HStack>
                            <HStack flex={1} justifyContent='space-between' >
                                <Text flex={1} color={'$textDark700'} $dark-color={'$textLight100'}>{item.associacao?.sigla}</Text>
                                <Box flex={0} >
                                    <Situacao situacao={AtivoInativoEnum[item.situacao]} pr={10} />
                                </Box>
                            </HStack>
                        </VStack>
                    </HStack>
                </HStack>
            </Box>
        </Card>
    );

    useEffect(() => {
        buscarTemplateDocumentos();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarTemplateDocumentos();
        }
    }
    const { openDialog } = useDialog();

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormTemplatesDocumentos onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='flex-end'>
                <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10} >
                <FlatList
                    data={templatesDocumentos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={() => buscarTemplateDocumentos()}

                />
            </Box>
        </Box>
    )
}