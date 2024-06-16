import { Box, FlatList, HStack, VStack, Avatar, Heading, Text, Tabs, TabsTabPanel, TabsTabPanels } from '@gluestack-ui/themed'
import { Button } from '../../components/buttons/Button'
import { useEffect, useState } from 'react'
import { buscarCursoPorId, buscarTodosCursos, excluirCurso } from '../../service/api/requests/cursoRequests'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu'
import { Card } from '@gluestack-ui/themed'
import Situacao from '../../components/Situacao'
import AtivoInativoEnum from '../../enums/AtivoInativoEnum'
import { FormCursos } from './FormCursos'
import { useDialog } from "../../components/dialog/DialogContext";
import { useToast } from 'react-native-toast-notifications'

export default function Cursos() {
    const globalToast = useToast()

    const [cursos, setCursos] = useState([])
    const [dadosFormEdicao, setDadosFormEdicao] = useState();
    const [filtros, setFiltros] = useState({
        iLike: {
            nome: null,
        },
    });
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [filtersIsOpen, setFiltersIsOpen] = useState(false);

    const buscarCursos = async () => {
        try {
            setListIsRefreshing(true);
            const response = await buscarTodosCursos(filtros);
            setCursos(response.data);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setListIsRefreshing(false)
        }
    };

    const acaoExcluirCurso = async (id) => {
        try {
            await excluirCurso(id);
            buscarCursos();
            globalToast.show("Sucesso", { data: { messageDescription: 'Curso excluído com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Erro ao excluir", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    }

    const acaoEditarCurso = async (id) => {
        await buscarCursoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                nome: response.data.nome,
                situacao: response.data.situacao,
                instituicao_id: response.data.instituicao_id,
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
            <HStack flex={1} justifyContent='space-between' my={12} gap={10}>
                <VStack flex={1}>
                    <HStack flex={1} justifyContent='space-between' >
                        <Heading flex={1} numberOfLines={1} color={'$textDark700'}>{item.nome}</Heading>
                        <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={
                            [{
                                onPress: () => acaoEditarCurso(item.id),
                                nomeIcone: 'pencil-outline',
                                corIcone: '#005db4',
                                label: 'Editar',
                            },
                            {
                                onPress: () => {
                                    openDialog('EXCLUIR', { onPress: () => acaoExcluirCurso(item.id) })
                                },
                                nomeIcone: 'trash-can-outline',
                                corIcone: '#dc2626',
                                label: 'Excluir',
                            },
                            ]
                        } />
                    </HStack>
                    <HStack flex={1} justifyContent='space-between' alignItems='center' gap={12} >
                        {item.instituicao && (
                            <Text flex={1} numberOfLines={1} color={'$textDark700'}>{item.instituicao.nome}</Text>
                        )}
                        <Situacao situacao={AtivoInativoEnum[item.situacao]} pr={10} />
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );

    useEffect(() => {
        buscarCursos();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarCursos();
        }
    }
    const { openDialog } = useDialog();

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormCursos onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='flex-end'>
                <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10} >

                <FlatList
                    data={cursos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={() => buscarCursos()}

                />
            </Box>
        </Box>
    )
}