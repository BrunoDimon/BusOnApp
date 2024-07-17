import React, { useEffect, useState } from 'react';
import { Box, FlatList, HStack, Avatar, Heading, Text, ModalBackdrop, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';
import { Button } from '../../components/buttons/Button';
import { buscarTodosUsuarios, excluirAluno, buscarAlunoPorId, excluirUsuario, buscarUsuarioPorId } from '../../service/api/requests/usuarioRequests'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu';
import { Card } from '@gluestack-ui/themed';
import Situacao from '../../components/Situacao';
import AtivoInativoEnum from '../../enums/AtivoInativoEnum';
import { FormUsuario } from './FormUsuario';
import { useDialog } from '../../components/dialog/DialogContext';
import DaysCircle from '../../components/DaysCircle';
import { VStack } from '@gluestack-ui/themed';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

export default function Usuario({ navigation }) {
    const globalToast = useToast();

    const [alunos, setAlunos] = useState([]);
    const [dadosFormEdicao, setDadosFormEdicao] = useState(null);
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const { openDialog } = useDialog();

    const userInfos = useSelector(state => state.auth.user);
    const eUsuarioAdmin = userInfos.tipoAcesso == "ADMIN";

    useEffect(() => {
        navigation.setOptions({ onRightButtonPress: buscarUsuarios })
    }, [navigation]);

    const buscarUsuarios = async () => {
        const whereClause =
            eUsuarioAdmin
                ?
                { notEquals: { tipoAcesso: 'ALUNO' } }
                :
                { equals: { associacaoId: userInfos.associacaoId }, notEquals: { tipoAcesso: 'ADMIN' } }
        const orderBy = [{ field: 'situacao', direction: 'ASC' }, { field: 'nome', direction: 'ASC' },]
        try {
            setListIsRefreshing(true);
            const response = await buscarTodosUsuarios(whereClause, orderBy);
            setAlunos(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error.response.data);
            globalToast.show("Erro ao buscar", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        } finally {
            setListIsRefreshing(false);
        }
    };

    const acaoExcluirUsuario = async (id) => {
        try {
            if (userInfos.id == id) {
                globalToast.show("Erro ao deletar", { data: { messageDescription: 'Não é possivel excluir o próprio usuário!' }, type: 'warning' })
                return
            }
            await excluirUsuario(id);
            buscarUsuarios();
            globalToast.show("Sucesso", { data: { messageDescription: 'Usuário excluído com sucesso!' }, type: 'success' })
        } catch (error) {
            globalToast.show("Falha ao excluir o usuário", { data: { messageDescription: error.response.data.message }, type: 'warning' })
        }
    };

    const acaoEditarUsuario = async (id) => {
        await buscarUsuarioPorId(id).then((response) => {
            const dados = {
                associacaoId: response.data?.associacao?.id,
                id: response.data?.id,
                nome: response.data?.nome,
                email: response.data?.email,
                telefone: response.data?.telefone,
                cidade: response.data?.cidade,
                cpf: response.data?.cpf,
                matricula: response.data?.matricula,
                cursoId: response.data?.curso?.id,
                instituicaoId: response.data.curso?.instituicao?.id,
                dataEntradaAssociacao: response.data?.dataEntradaAssociacao,
                tipoAcesso: response.data?.tipoAcesso,
                cargo: response.data?.cargo,
                situacao: response.data?.situacao,
                diasUsoTransporte: response.data?.diasUsoTransporte,
                senha: response.data?.senha,
                foto: response.data?.fotoUrl,
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
        <Card bg='$white' $dark-bg="$backgroundDark925" flexDirection="col" px={12} mb={10} mx={15} borderLeftWidth={10} borderColor={'$yellow500'} borderRadius={'$xl'} hardShadow='5'>
            <HStack flex={1} justifyContent='space-between' my={12} gap={10}>
                <VStack flex={1}>
                    <HStack justifyContent='space-between'>
                        <HStack flex={1} gap={10} alignItems='center' mb={5}>
                            <Avatar>
                                {
                                    item.fotoUrl ?
                                        (<AvatarImage source={process.env.EXPO_PUBLIC_FILES_API_URL + item.fotoUrl} alt={'foto'} />)
                                        :
                                        (<AvatarFallbackText>{item.nome}</AvatarFallbackText>)
                                }
                            </Avatar>
                            <VStack flex={1}>
                                <Heading numberOfLines={1} color={'$textDark700'} $dark-color={'$textLight100'}>{item.nome}</Heading>
                                <Text numberOfLines={1} color={'$textDark700'} $dark-color={'$textLight100'}>{`${item?.curso?.nome || ''} - ${item?.curso?.instituicao?.nome || ''}`}</Text>
                            </VStack>
                        </HStack>
                        <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={[
                            {
                                onPress: () => acaoEditarUsuario(item.id),
                                nomeIcone: 'pencil-outline',
                                corIcone: '#005db4',
                                label: 'Editar',
                            },
                            {
                                onPress: () => {
                                    openDialog('EXCLUIR', { onPress: () => acaoExcluirUsuario(item.id) })
                                },
                                nomeIcone: 'trash-can-outline',
                                corIcone: '#dc2626',
                                label: 'Excluir',
                            },
                        ]} />
                    </HStack>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Situacao situacao={AtivoInativoEnum[item.situacao]} pr={10} />
                        {
                            userInfos.tipoAcesso != 'ADMIN'
                                ?
                                <DaysCircle daysActive={item.diasUsoTransporte} />
                                :
                                <Text>{item.associacao?.sigla}</Text>
                        }
                    </HStack>
                </VStack>
            </HStack>

        </Card>
    );

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarUsuarios();
        }
    };
    return (
        <Box flex={1}>
            {
                formIsOpen && <FormUsuario onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='flex-end'>
                <Button label={'Cadastrar'} isLoading={formIsOpen} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10}>
                <FlatList
                    data={alunos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={buscarUsuarios}
                />
            </Box>
        </Box >
    );
}
