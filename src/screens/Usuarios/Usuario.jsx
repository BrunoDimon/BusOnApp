import React, { useEffect, useState } from 'react';
import { useToast, Box, FlatList, HStack, Avatar, Heading, Text } from '@gluestack-ui/themed';
import { Button } from '../../components/buttons/Button';
import { buscarTodosAlunos, excluirAluno, buscarAlunoPorId } from '../../service/api/requests/usuarioRequests'
import ButtonDotsDropdownMenu from '../../components/buttons/ButtonDotsDropdownMenu';
import { Card } from '@gluestack-ui/themed';
import Situacao from '../../components/Situacao';
import AtivoInativoEnum from '../../enums/AtivoInativoEnum';
import { FormAluno } from './FormUsuario';
import { useDialog } from '../../components/dialog/DialogContext';
import ToastConfig from '../../components/toasts/ToastConfig';
import DaysCircle from '../../components/DaysCircle';
import { VStack } from '@gluestack-ui/themed';

export default function Usuario() {
    const toast = useToast();

    const [alunos, setAlunos] = useState([]);
    const [dadosFormEdicao, setDadosFormEdicao] = useState(null);
    const [listIsRefreshing, setListIsRefreshing] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const { openDialog } = useDialog();

    const buscarAlunos = async () => {
        console.log('Executou reload');
        try {
            setListIsRefreshing(true);
            const response = await buscarTodosAlunos();
            setAlunos(response.data);
        } catch (error) {
            console.error('Erro ao buscar alunos:', error.response.data);
        } finally {
            setListIsRefreshing(false);
        }
    };

    const acaoExcluirAluno = async (id) => {
        try {
            await excluirAluno(id);
            buscarAlunos();
            toast.show(ToastConfig('success', 'Sucesso', 'Sucesso ao deletar!', (v) => toast.close(v)));
        } catch (error) {
            toast.show(ToastConfig('error', 'Erro ao deletar!', error.response.data.message, (v) => toast.close(v)));
        }
    };

    const acaoEditarAlunos = async (id) => {
        await buscarAlunosPorId(id).then((response) => {
            const dados = {
                id: response.data.id,
                nome: response.data.nome,
                email: response.data.email,
                telefone: response.data.telefone,
                associacaoId: response.data.associacaoId,
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
            <HStack flex={1} justifyContent='space-between' my={12} gap={10}>
                <VStack flex={1}>
                    <HStack justifyContent='space-between'>
                        <HStack flex={1} gap={10} alignItems='center' mb={5}>
                            <Avatar></Avatar>
                            <VStack flex={1}>
                                <Heading numberOfLines={1} color={'$textDark700'}>{item.nome}</Heading>
                                <Text numberOfLines={1} color={'$textDark700'}>{`${item?.curso?.nome || ''} - ${item?.curso?.instituicao?.nome || ''}`}</Text>
                            </VStack>
                        </HStack>
                        <ButtonDotsDropdownMenu titulo={item.id + '-' + item.nome} opcoesMenu={[
                            {
                                onPress: () => acaoEditarAluno(item.id),
                                nomeIcone: 'pencil-outline',
                                corIcone: '#005db4',
                                label: 'Editar',
                            },
                            {
                                onPress: () => {
                                    openDialog('EXCLUIR', { onPress: () => acaoExcluirAluno(item.id) })
                                },
                                nomeIcone: 'trash-can-outline',
                                corIcone: '#dc2626',
                                label: 'Excluir',
                            },
                        ]} />
                    </HStack>
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Situacao situacao={AtivoInativoEnum[item.situacao]} pr={10} />
                        <DaysCircle daysActive={item.diasUsoTransporte} />
                    </HStack>
                </VStack>
            </HStack>

        </Card>
    );

    /*     {item.associacao && (
            <Text color={'$textDark700'}>{item.associacao.nome}</Text>
        )} */

    useEffect(() => {
        buscarAlunos();
    }, []);

    const handleFormClose = (reconsultarRegistros) => {
        setDadosFormEdicao(null);
        setFormIsOpen(false);
        if (reconsultarRegistros) {
            buscarAlunos();
        }
    };

    return (
        <Box flex={1}>
            {
                formIsOpen && <FormAluno onClose={(v) => handleFormClose(v)} dadosEdicao={dadosFormEdicao} />
            }
            <HStack mx={15} mt={5} gap={5} justifyContent='space-between'>
                <Button label={'Filtros'} variant={'outline'} action={'secondary'} />
                <Button label={'Cadastrar Aluno'} onPress={() => setFormIsOpen(true)} />
            </HStack>
            <Box flex={1} pt={10}>
                <FlatList
                    data={alunos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    initialNumToRender={8}
                    windowSize={4}
                    refreshing={listIsRefreshing}
                    onRefresh={buscarAlunos}
                />
            </Box>
        </Box>
    );
}
