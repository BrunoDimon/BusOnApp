import { useToast, Box, FlatList, HStack, VStack, Avatar, Heading, Text } from '@gluestack-ui/themed'
import { Button } from '../../components/buttons/Button'
import { useEffect, useState } from 'react'
import { buscarInstituicaoPorId, buscarTodasInstituicoes, excluirInstituicao } from '../../service/api/requests/instituicaoRequests'
import CardBox from '../../components/CardBox'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu'
import { Card } from '@gluestack-ui/themed'
import Situacao from '../../components/Situacao'
import AtivoInativoEnum from '../../enums/AtivoInativoEnum'
import { FormInstituicao } from './FormInstituicao'
import { useDialog } from "../../components/dialog/DialogContext";
import ToastConfig from "../../components/toasts/ToastConfig"

export default function Instituicao() {
    const toast = useToast()

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

    const buscarInstituicoes = async () => {
        console.log('Executou reload')
        try {
            setListIsRefreshing(true);
            const response = await buscarTodasInstituicoes(filtros);
            setInstituicoes(response.data);
        } catch (error) {
            console.error('Erro ao buscar instituições:', error.response.data);
        } finally {
            setListIsRefreshing(false)
        }
    };

    const acaoExcluirInstituicao = async (id) => {
        try {
            await excluirInstituicao(id);
            buscarInstituicoes();
            toast.show(ToastConfig('success', 'Sucesso', 'Sucesso ao deletar!', (v) => toast.close(v)));
        } catch (error) {
            toast.show(ToastConfig('error', 'Erro ao deletar!', error.response.data.message, (v) => toast.close(v)));
        }
    }

    const acaoEditarInstituicao = async (id) => {
        await buscarInstituicaoPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                nome: response.data.nome,
                endereco: response.data.endereco,
                situacao: response.data.situacao,
                associacao_id: response.data.associacaoId,
            }
            setDadosFormEdicao(dados);
            setFormIsOpen(true);
        }).catch((error) => {
            setDadosFormEdicao(null);
            console.error(error.response.data)
            toast.show(ToastConfig('error', 'Erro', error.response.data.message, (v) => toast.close(v)));
        })
    }

    const renderItem = ({ item }) => (
        <Card bg={'white'} flexDirection="col" px={12} mb={10} mx={15} borderLeftWidth={10} borderColor={'$yellow400'} borderRadius={'$xl'} hardShadow='5'>
            <Box justifyContent="space-between" flexDirection="col">
                <HStack justifyContent='space-between' my={12}>
                    <HStack alignItems='center' gap={12} >
                        <Avatar></Avatar>
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
            <HStack mx={15} mt={5} gap={5} justifyContent='space-between'>
                <Button label={'Filtros'} variant={'outline'} action={'secondary'} />
                <Button label={'Cadastrar'} onPress={() => setFormIsOpen(true)} />
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